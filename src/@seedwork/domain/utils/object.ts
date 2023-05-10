export function deepFreeze<Type>(object: Type) {
  // Returns the names of the own properties of an object.
  const propNames = Object.getOwnPropertyNames(object);

  // console.log("deepFreeze propNames", propNames);

  for (const name of propNames) {
    const value = object[name as keyof Type];
    // console.log("keyof", value);

    if (value && typeof value === "object") {
      // console.log("nested", value);
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}
