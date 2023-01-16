import json
import os
import pandas

f = open("data/college_names.json", "r")
college_names = json.load(f)
college_names.sort()
f.close()

def convert_df_to_json(df):
    res = []
    for _index, row in df.iterrows():
        res.append({
            "name": row['INSTNM'],
            "admissionRate": 100 * round(row['ADM_RATE'], 2),
            "studentBody": row['UGDS'],
            "endowment": round(row['ENDOWEND'] / 1000000000, 2),
            "latitude": row['LATITUDE'],
            "longitude": row['LONGITUDE'],
            "mascot": row["Nickname"],
            "athleticConference": row["Conference"]
        })
    return res

def get_missing_names(names_list, college_data_list):
    missing_names = []
    for name in names_list:
        if name not in college_data_list['INSTNM'].values:
            missing_names.append(name) 
    return missing_names

def write_data(filename):
    scorecard_df = pandas.read_csv("/Users/clarkoh-willeke/Downloads/college_scorecard_simple.csv", usecols=["INSTNM", "ADM_RATE", "UGDS", "LOCALE", "ENDOWEND", "LATITUDE", "LONGITUDE"])
    college_list = (scorecard_df.query('INSTNM in @college_names')) 
    res = pandas.merge(get_athletic_info(), college_list, on="INSTNM")
    res.fillna("N/A")
    output_file = open(filename, "w")
    print(get_missing_names(college_names, res))
    json.dump(convert_df_to_json(res), output_file)
    output_file.close()
    

def get_athletic_info():
    d1 = pandas.read_csv("data/d1.csv", usecols=["INSTNM", "Nickname", "Conference"])
    d1["Conference"] = d1['Conference'].astype(str) + " (D1)"
    d2 = pandas.read_csv("data/d2.csv", usecols=["INSTNM", "Nickname", "Conference"])    
    d2["Conference"] = d2['Conference'].astype(str) + " (D2)" 
    d3 = pandas.read_csv("data/d3.csv", usecols=["INSTNM", "Nickname", "Conference"])    
    d3["Conference"] = d3['Conference'].astype(str) + " (D3)"
    return pandas.concat([d1, d2, d3], axis=0)

def simplify_csv(filename):
    data = pandas.read_csv(filename, usecols=["INSTNM", "ADM_RATE", "UGDS", "LOCALE", "ENDOWEND", "LATITUDE", "LONGITUDE"])
    data = data.dropna()
    data.to_csv("data/filtered_college_data.csv")

# simplify_csv("/Users/clarkoh-willeke/Downloads/college_scorecard.csv")
write_data("data/colleges.json")
# print(get_missing_names(college_names, get_athletic_info()))