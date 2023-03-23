import requests
import json

file=open("dataset-extra1tpc3.json")
pessoas=json.load(file)["pessoas"]
for pessoa in pessoas:
    pessoa["_id"] = pessoa["id"]
    pessoa.pop("id",None)

    r=requests.post("http://localhost:7777/pessoas", data=pessoa)
