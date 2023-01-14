import json
import os
import pandas

# print(os.listdir())
f = open("data/college_names.json", "r")
college_names = json.load(f)
college_names.sort()
f.close()
scorecard_df = pandas.read_csv("/Users/clarkoh-willeke/Downloads/college_scorecard.csv", usecols=["INSTNM", "ADM_RATE", "UGDS", "LOCALE", "ENDOWEND", "LATITUDE", "LONGITUDE"])
college_list = (scorecard_df.query('INSTNM in @college_names')) 

complete_names_df = pandas.DataFrame(college_names) 
missing_names = []
for name in college_names:
    if name not in college_list['INSTNM'].values:
        missing_names.append(name)

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
            "admissionRate": 100 * row['ADM_RATE'],
            "studentBody": row['UGDS'],
            "locale": locales[row['LOCALE']],
            "endowment": row['ENDOWEND'],
            "latitude": row['LATITUDE'],
            "longitude": row['LONGITUDE']
        })
    return res
# print(len(missing_names), missing_names)
print(convert_df_to_json(college_list))
output_file = open("data/colleges.json", "w")
json.dump(convert_df_to_json(college_list), output_file)
output_file.close()
# how do we get the list of colleges excluded from the list 270 - 187 ...


def get_missing_names(names_list, college_data_list):
    pass