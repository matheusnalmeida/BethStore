from utils import del_none


class Result:
    def __init__(self, id = None, success = None, message = None, url = None, data = None) -> None:
        self.id = id
        self.success = success
        self.message = message
        self.url = url
        self.data = data

    def to_json(self):
        to_json_func = getattr(self.data, "to_json", None)

        if callable(to_json_func) and type(self.data) == list:
            json_data = [data.to_json() for data in self.data]
        elif callable(to_json_func):
            json_data = self.data.to_json()
        else:
            json_data = self.model_to_json(self.data)

        json = {
            "id": self.id,
            "success": self.success,
            "message": self.message,
            "url": self.url,
            "data":  json_data  
        }
        json = del_none(json)
        return json
    
    def model_to_json(self, data):
        if (type(data) == list):
            return [self.model_to_json(act_data) for act_data in data]
        else:    
            try:
                return {c.name: getattr(data, c.name) for c in data.__table__.columns} # Default sql alchemy mapping
            except:
                return data