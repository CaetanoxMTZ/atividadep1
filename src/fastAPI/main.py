from fastapi import FastAPI, Depends, Request, Form
from sqlalchemy.orm import Session
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from database import SessionLocal
from modelos import Base, Item
from repositorios import RepositorioItem

app = FastAPI()

templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def ler_raiz(request: Request, db: Session = Depends(get_db)):
    repositorio = RepositorioItem()
    itens = repositorio.ler_todos(db)
    return templates.TemplateResponse("index.html", {"request": request, "itens": itens})

@app.get("/itens/criar")
async def criar_item_form(request: Request):
    return templates.TemplateResponse("criar.html", {"request": request, "url": "/itens/criar"})

@app.post("/itens/criar")
async def criar_item(request: Request, db: Session = Depends(get_db), nome: str = Form(...), descricao: str = Form(...), preco: float = Form(...)):
    repositorio = RepositorioItem()
    item_novo = Item(nome=nome, descricao=descricao, preco=preco)
    item_criado = repositorio.criar(db, item_novo)
    return templates.TemplateResponse("index.html", {"request": request, "itens": repositorio.ler_todos(db)})

@app.get("/itens/editar/{item_id}")
async def editar_item_form(request: Request, item_id: int, db: Session = Depends(get_db)):
    repositorio = RepositorioItem()
    item = repositorio.ler_por_id(db, item_id)
    if item:
        return templates.TemplateResponse("editar.html", {"request": request, "item": item, "url": f"/itens/editar/{item_id}"})
    else:
        raise HTTPException(status_code=404, detail="Item not found")

@app.post("/itens/editar/{item_id}")
async def editar_item(request: Request, item_id: int, db: Session = Depends(get_db), nome: str = Form(...), descricao: str = Form(...), preco: float = Form(...)):
    repositorio = RepositorioItem()
    dados = {"nome": nome, "descricao": descricao, "preco": preco}
    item_atualizado = repositorio.atualizar(db, item_id, dados)
    return templates.TemplateResponse("index.html", {"request": request, "itens": repositorio.ler_todos(db)})

@app.get("/itens/deletar/{item_id}")
async def deletar_item(request: Request, item_id: int, db: Session = Depends(get_db)):
    repositorio = RepositorioItem()
    repositorio.deletar(db, item_id)
    return templates.TemplateResponse("index.html", {"request": request, "itens": repositorio.ler_todos(db)})
