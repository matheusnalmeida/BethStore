from utils import del_none, model_to_json


class Result:
    def __init__(self, id = None, success = None, message = None, url = None, data = None) -> None:
        self.id = id
        self.success = success
        self.message = message
        self.url = url
        self.data = data

    def to_json(self):
        json = {
            "id": self.id,
            "success": self.success,
            "message": self.message,
            "url": self.url,
            "data": model_to_json(self.data) 
        }
        json = del_none(json)
        return json