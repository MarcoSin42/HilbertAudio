class point:
    def __init__(self, x:int, y:int) -> None:
        self.x = x
        self.y = y
    
    def __str__(self) -> str:
        return f"({x}, {y})"
    """
    def translate(self, dx:int, dy:int) -> None:
        self.x += dx
        self.y += dy
    """
