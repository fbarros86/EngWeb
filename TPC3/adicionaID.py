import json

f= open("dataset.json")
pessoas = json.load(f)["pessoas"]
f.close()
d=0
for pessoa in pessoas:
    pessoa["id"]=d
    d+=1
json.dump({"pessoas":pessoas},open("dataset.json","w"))