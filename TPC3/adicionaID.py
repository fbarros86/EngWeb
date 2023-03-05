import json

f= open("dataset-extra1.json")
pessoas = json.load(f)["pessoas"]
f.close()
d=0
for pessoa in pessoas:
    pessoa["id"]=d
    d+=1
json.dump({"pessoas":pessoas},open("dataset-extra1.json","w"))