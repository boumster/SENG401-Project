from typing import Optional
from pydantic import BaseModel

class UserData(BaseModel):
    username: str
    email: str
    password: str

class LoginData(BaseModel):
    username: str
    password: str
    
class MealPlanRequest(BaseModel):
    ingredients: Optional[str] = None
    calories: Optional[int] = None
    meal_type: Optional[str] = None
    meals_per_day: Optional[int] = None
    cuisine: Optional[str] = None
    favorite_ingredients: Optional[str] = None
    disliked_ingredients: Optional[str] = None
    cooking_skill: Optional[str] = None
    cooking_time: Optional[str] = None
    available_ingredients: Optional[str] = None
    budget: Optional[str] = None
    grocery_stores: Optional[str] = None