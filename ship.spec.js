import Ship from "./modules/ship";

test("hit() increases the number of 'hits' in your ship", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(3);
});

test("isSunk() caclculates whether a ship is considered sunk based on its length and number of hits", () => {
  const ship = new Ship(3);
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
