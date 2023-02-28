import json

pessoas = json.load(open("dataset-extra1.json"))["pessoas"]
d=0
for pessoa in pessoas:
    pessoa["id"]=d
    d+=1
json.dump({"pessoas":pessoas},open("dataset-extra1.json","w"))