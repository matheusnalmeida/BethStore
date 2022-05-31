from tkinter.messagebox import RETRY


def del_none(d):
    for key, value in list(d.items()):
        if value is None:
            del d[key]
        elif isinstance(value, dict):
            del_none(value)
    return d

    
def model_to_json(data):
    if data == None:
        return None

    if (type(data) == list):
        return [model_to_json(act_data) for act_data in data]
    
    to_json_func = getattr(data, "to_json", None)

    if callable(to_json_func):
        return data.to_json()
    else:    
        try:
            return {c.name: getattr(data, c.name) for c in data.__table__.columns} # Default sql alchemy mapping
        except:
            return data

def get_json_val(json, property):
    return json[property] if property in json else ''