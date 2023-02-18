import json

f = open("mapa.json")
mapa = json.load(f)

cidades = mapa["cidades"]
cidades.sort(key = lambda x: x["nome"] )

ligacoes = {}
codigos ={}
for c in cidades:
    codigos[c["id"]] = c["nome"]
for lig in mapa["ligações"]:
    if lig["origem"] not in ligacoes: ligacoes[lig["origem"]]=[]
    ligacoes[lig["origem"]].append((lig["destino"],lig["distância"]))

pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1 class="titulo">Mapa Virtual</h1>
        <table>
            <tr>
                <td width="30%" valign="top" class="indice">
                    <a name=indice></a>
                    <h3>Indice</h3>
                <ol>
"""
for c in cidades:
    pagHTML+= f"""<li><a href=#{c["id"]}>{c["nome"]}</a>
                        </li>"""
                        
pagHTML+="</ol> </td>  <td width='70%' class='descricao'>"

for c in cidades:
    pagHTML+= f"""
                
                    <h3><a name={c["id"]}>{c["nome"]}</a></h3>
                    <p><b>Distrito:</b> {c["distrito"]}</p>
                    <p><b>População:</b> {c["população"]}</p>
                    <p><b>Descrição:</b> {c["descrição"]}</p>
                    <dl>"""
                   
    if (c["id"] in ligacoes):
        pagHTML+=  """<dt><p><b>Ligações:</b></dt>
                    <dd>
                        <ol>"""
        for lig in ligacoes[c["id"]]:
            pagHTML+=f"<li><a href=#{lig[0]}>{codigos[lig[0]]}</a>:{lig[1]}</li>"
        pagHTML+=" </ol> </dd>"
    pagHTML+="""   
                    </dl>
                    <adress><a href=#indice> Voltar ao indice</a></adress>
                    <center>
                        <hr width="80%"/>
                    </center>
            """
pagHTML+=""" </td> </tr> </table>
    </body>
</html>"""
print(pagHTML)
