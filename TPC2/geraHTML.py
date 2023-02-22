import json

with open("../mapa.json") as f:
    mapa = json.load(f)


cidades = mapa["cidades"]
cidades.sort(key = lambda x: x["nome"] )

ligacoes = {}
codigos = {}
distritos = {}
for c in cidades:
    codigos[c["id"]] = c["nome"]
    if c["distrito"] not in distritos:
        distritos[c["distrito"]]=[]
    distritos[c["distrito"]].append((c["id"],c["nome"]))
for lig in mapa["ligações"]:
    if lig["origem"] not in ligacoes: ligacoes[lig["origem"]]=[]
    ligacoes[lig["origem"]].append((lig["destino"],lig["distância"]))
districts = list(distritos.keys())
districts.sort()
pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <dl>
"""
for d in districts:
    pagHTML+=f"""<dt><h3>{d}</h3></dt>
            <dd>
                <ul>"""
    distritos[d].sort(key=lambda x: x[1])
    for c in distritos[d]:
        pagHTML+=f"""<li><a href="/{c[0]}" >{c[1]}</a></li>"""
    pagHTML+="</ul> </dd>"
pagHTML+="""</dl>
    </body>
</html>
"""
with open("index.html","w") as f:
    f.write(pagHTML)

for c in cidades:
    pagHTML=f"""<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <dl>
        <dt><h1>{c["nome"]}</h1></dt>
        <dd>
                    <p><b>Distrito:</b> {c["distrito"]}</p>
                    <p><b>População:</b> {c["população"]}</p>
                    <p><b>Descrição:</b> {c["descrição"]}</p>
                    <dl>
                    """
    if (c["id"] in ligacoes):
        pagHTML+=  """<dt><p><b>Ligações:</b></dt>
                    <dd>
                        <ul>"""
        for lig in ligacoes[c["id"]]:
            pagHTML+=f"<li><a href=/{lig[0]}>{codigos[lig[0]]}</a>: {lig[1]} km</li>"
        pagHTML+=" </ul> </dd>"
    with open(f"{c['id']}.html","w") as f:
        f.write(pagHTML)
