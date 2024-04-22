from abc import ABC, abstractmethod
from sqlalchemy.orm import Session
from modelos import Item

class IRepositorio(ABC):
    @abstractmethod
    def criar(self, db: Session, dados: any):
        pass

    @abstractmethod
    def ler_todos(self, db: Session):
        pass

    @abstractmethod
    def ler_por_id(self, db: Session, id: int):
        pass

    @abstractmethod
    def atualizar(self, db: Session, id: int, dados: dict):
        pass

    @abstractmethod
    def deletar(self, db: Session, id: int):
        pass

class RepositorioItem(IRepositorio):
    def criar(self, db: Session, dados: any):
        db.add(dados)
        db.commit()
        db.refresh(dados)
        return dados

    def ler_todos(self, db: Session):
        return db.query(Item).all()

    def ler_por_id(self, db: Session, id: int):
        return db.query(Item).filter(Item.id == id).first()

    def atualizar(self, db: Session, id: int, dados: dict):
        item = db.query(Item).filter(Item.id == id).first()
        if item:
            for chave, valor in dados.items():
                setattr(item, chave, valor)
            db.commit()
            return item
        return None

    def deletar(self, db: Session, id: int):
        item = db.query(Item).filter(Item.id == id).first()
        if item:
            db.delete(item)
            db.commit()
            return True
        return False
