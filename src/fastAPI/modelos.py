from sqlalchemy import Column, Integer, String, Float
from database import Base

class Item(Base):
    __tablename__ = 'itens'

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(255), index=True)  # Especificando o comprimento para VARCHAR
    descricao = Column(String(255), index=True)  # Adicionando um comprimento aqui também
    preco = Column(Float)

    def __repr__(self):
        return f"<Item(nome={self.nome}, descricao={self.descricao}, preco={self.preco})>"
