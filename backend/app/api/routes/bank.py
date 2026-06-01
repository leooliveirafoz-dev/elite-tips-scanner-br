"""
Rotas da API - Banca
Endpoints para gerenciamento de banca
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import BankCreate, BankUpdate, BankResponse
from app.models import Bank

router = APIRouter(prefix="/bank", tags=["bank"])

@router.get("", response_model=BankResponse)
async def get_bank(db: Session = Depends(get_db)):
    """Obtém informações atuais da banca"""
    bank = db.query(Bank).first()
    
    if not bank:
        # Cria banca padrão se não existir
        default_bank = Bank()
        db.add(default_bank)
        db.commit()
        db.refresh(default_bank)
        return default_bank
    
    return bank

@router.post("", response_model=BankResponse)
async def create_bank(bank_data: BankCreate, db: Session = Depends(get_db)):
    """Cria uma nova banca (substitui a anterior)"""
    # Remove banca anterior se existir
    existing_bank = db.query(Bank).first()
    if existing_bank:
        db.delete(existing_bank)
        db.commit()
    
    db_bank = Bank(**bank_data.dict())
    db.add(db_bank)
    db.commit()
    db.refresh(db_bank)
    
    return db_bank

@router.put("", response_model=BankResponse)
async def update_bank(
    bank_update: BankUpdate,
    db: Session = Depends(get_db)
):
    """Atualiza informações da banca"""
    bank = db.query(Bank).first()
    
    if not bank:
        raise HTTPException(status_code=404, detail="Bank not found")
    
    update_data = bank_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(bank, key, value)
    
    db.add(bank)
    db.commit()
    db.refresh(bank)
    
    return bank

@router.get("/metrics", response_model=dict)
async def get_bank_metrics(db: Session = Depends(get_db)):
    """Obtém métricas detalhadas da banca"""
    bank = db.query(Bank).first()
    
    if not bank:
        raise HTTPException(status_code=404, detail="Bank not found")
    
    return {
        "current_bank": bank.current_bank,
        "initial_bank": bank.initial_bank,
        "total_profit": bank.total_profit,
        "roi": bank.roi,
        "yield": bank.yield_metric,
        "win_rate": bank.win_rate,
        "total_entries": bank.total_entries,
        "total_green": bank.total_green,
        "total_red": bank.total_red,
        "max_drawdown": bank.max_drawdown,
        "current_bad_run": bank.current_bad_run,
        "max_bad_run": bank.max_bad_run,
        "stake_type": bank.stake_type,
        "stake_value": bank.stake_value,
    }

@router.post("/update-metrics")
async def update_bank_metrics(
    metrics: dict,
    db: Session = Depends(get_db)
):
    """Atualiza métricas da banca"""
    bank = db.query(Bank).first()
    
    if not bank:
        raise HTTPException(status_code=404, detail="Bank not found")
    
    # Atualiza campos de métrica se fornecidos
    allowed_fields = [
        "current_bank",
        "total_profit",
        "roi",
        "yield_metric",
        "win_rate",
        "total_entries",
        "total_green",
        "total_red",
        "max_drawdown",
        "current_bad_run",
        "max_bad_run"
    ]
    
    for field, value in metrics.items():
        if field in allowed_fields:
            setattr(bank, field, value)
    
    db.add(bank)
    db.commit()
    db.refresh(bank)
    
    return {"message": "Bank metrics updated successfully"}

@router.post("/reset")
async def reset_bank(db: Session = Depends(get_db)):
    """Reseta a banca para valores iniciais"""
    bank = db.query(Bank).first()
    
    if not bank:
        raise HTTPException(status_code=404, detail="Bank not found")
    
    bank.current_bank = bank.initial_bank
    bank.total_profit = 0.0
    bank.roi = 0.0
    bank.yield_metric = 0.0
    bank.win_rate = 0.0
    bank.total_entries = 0
    bank.total_green = 0
    bank.total_red = 0
    bank.max_drawdown = 0.0
    bank.current_bad_run = 0
    bank.max_bad_run = 0
    
    db.add(bank)
    db.commit()
    db.refresh(bank)
    
    return {"message": "Bank reset successfully", "bank": bank}
