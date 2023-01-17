import json
import pandas
import numpy as np

f = open("data/college_names.json", "r")
college_names = json.load(f)
# college_names.sort()
f.close()

def get_locale(code):
    if 11 >= code <= 13:
        return "City"
    if 21 >= code <= 23:
        return "Suburb"
    if 31 >= code <= 33:
        return "Town"
    if 41 >= code <= 43:
        return "Rural" 
    
def convert_df_to_json(df):
    res = []
    for _index, row in df.iterrows():
        res.append({
            "name": row['INSTNM'],
            "admissionRate": 100 * round(row['ADM_RATE'], 2),
            "studentBody": row['UGDS'],
            "locale": get_locale(row['LOCALE']),
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
    res = pandas.merge(left=college_list, right=get_athletic_info(), how='left', on="INSTNM")
    res = res.replace(np.nan, "NA").drop_duplicates(subset=["INSTNM"])
    output_file = open(filename, "w")
    json.dump(convert_df_to_json(res), output_file)
    output_file.close()
    

def get_athletic_info():
    d1 = pandas.read_csv("data/d1.csv", usecols=["INSTNM", "Nickname", "Conference"])
    d1["Conference"] = d1['Conference'].astype(str) + " (D1)"
    d2 = pandas.read_csv("data/d2.csv", usecols=["INSTNM", "Nickname", "Conference"])    
    d2["Conference"] = d2['Conference'].astype(str) + " (D2)" 
    d3 = pandas.read_csv("data/d3.csv", usecols=["INSTNM", "Nickname", "Conference"])    
    d3["Conference"] = d3['Conference'].astype(str) + " (D3)"
    other = pandas.read_csv("data/other_athletic.csv", usecols=["INSTNM", "Nickname", "Conference"])
    return pandas.concat([d1, d2, d3, other], axis=0)

write_data("data/colleges.json")