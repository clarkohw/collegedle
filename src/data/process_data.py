import json
import os
import pandas

# print(os.listdir())


def convert_df_to_json(df):
    locales = {11: "City: Large",
    12: "City: Medium",
    13: "City: Small",
    21: "Suburb: Large",
    22: "Suburb: Midsize",
    23: "Suburb: Small",
    31: "Town: Fringe",
    32: "Town: Distant",
    33: "Town: Remote",
    41: "Rural: Fringe",
    42: "Rural: Distant",
    43: "Rural: Remote"

    }
    res = []
    for _index, row in df.iterrows():
        res.append({
            "name": row['INSTNM'],
            "admissionRate": 100 * round(row['ADM_RATE'], 2),
            "studentBody": row['UGDS'],
            "locale": locales[row['LOCALE']],
            "endowment": round(row['ENDOWEND'] / 1000000000, 2),
            "latitude": row['LATITUDE'],
            "longitude": row['LONGITUDE']
        })
    return res

def get_missing_names(names_list, college_data_list):
    missing_names = []
    for name in names_list:
        if name not in college_data_list['INSTNM'].values:
            missing_names.append(name) 
    return missing_names

def write_data(filename):
    f = open("data/college_names.json", "r")
    college_names = json.load(f)
    college_names.sort()
    f.close()
    scorecard_df = pandas.read_csv("/Users/clarkoh-willeke/Downloads/college_scorecard.csv", usecols=["INSTNM", "ADM_RATE", "UGDS", "LOCALE", "ENDOWEND", "LATITUDE", "LONGITUDE"])
    college_list = (scorecard_df.query('INSTNM in @college_names')) 
    output_file = open(filename, "w")
    json.dump(convert_df_to_json(college_list), output_file)
    output_file.close()

def get_athletic_info():
    f = open("data/college_names.json", "r")
    college_names = json.load(f)
    college_names.sort()
    f.close()
    d1 = pandas.read_csv("data/d1.csv", usecols=["INSTNM", "Nickname", "Conference"])
    d2 = pandas.read_csv("data/d2.csv", usecols=["INSTNM", "Nickname", "Conference"])    
    d3 = pandas.read_csv("data/d3.csv", usecols=["INSTNM", "Nickname", "Conference"])    
    athletic_info = pandas.concat([d1, d2, d3], axis=0)
    print(len(athletic_info.query("School in @college_names")))
get_athletic_info()


write_data("data/colleges.json")