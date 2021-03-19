# session-storage

This is a small utility class for storing and retrieving complex values from sessionStorage. By default, sessionStorage only saves strings. But by using `JSON.stringify()` and `JSON.parse()`, we can save objects, arrays, nulls, Booleans, numbers, and strings. And when using the `getItem()` method, it will retrieve those values in their native type.

This package also fails gracefully (and silently) in those instances where _there is no sessionStorage available_ in the client. One example where this can happen is when a user's browser is in Incognito Mode. In such cases, this package will use a simple session object to store the values temporarily. This will provide some semblance of sessionStorage-like behavior, even if those values will not be present in the next session.

Due to the limitations of `JSON.stringify()` and `JSON.parse()`, the integrity of retrieved values cannot be maintained for certain complex values. Specifically, _functions_ will not survive the `JSON.stringify()/JSON.parse()` process.

## Usage

```javascript
import { session } from '@toolz/session-storage';

session.setItem('theAnswer', 42); // sets the value 42 in sessionStorage
session.getItem('theAnswer'); // returns the number 42
```

## Methods

### .clear()

`.clear()` empties all values from sessionStorage.

```javascript
const API = {
   arguments: {},
   returns: void,
}
```

**Examples:**

```javascript
session.setItem('one', 1);
session.setItem('two', 2);

session.clear();

session.getItem('one'); // returns NULL
session.getItem('two', 22); // return 22
```

### .getItem()

`.getItem()` retrieves an item from sessionStorage in its native data type. If it doesn't exist and no default value is provided, it returns `NULL`. If a default value is provided and the item doesn't exist, it sets the default value as the item and returns that value.

```javascript
const API = {
   arguments: {
      itemName: {
         required,
         format: 'populated string',
      },
      defaultValue: {
         optional,
         format: any,
      },
   },
   returns: any,
}
```

**Examples:**

```javascript
session.setItem('foo', [1, 2, 3]);
session.setItem('firstName', 'Joe');
session.setItem('address', {street: '101 Main', city: 'fooville'});

session.getItem('foo'); // returns [1, 2, 3]
session.getItem('firstName'); // returns 'Joe'
session.getItem('address'); // returns {street: '101 Main', city: 'fooville'}
session.getItem('notSet'); // returns NULL
session.getItem('anotherNotSet', 3.14); // returns 3.14
```

### .removeItem()

`.removeItem()` unsets an item from sessionStorage. If the item didn't previously exist, the method throws no error.

```javascript
const API = {
   arguments: {
      itemName: {
         required,
         format: 'populated string',
      },
   },
   returns: true,
}
```

**Examples:**

```javascript
session.setItem('foo', [1, 2, 3]);
session.setItem('firstName', 'Joe');

session.removeItem('foo');
session.removeItem('firstName');

session.getItem('foo'); // returns NULL
session.getItem('firstName', 'Mary'); // return 'Mary'
```

### .setItem()

`.setItem()` sets an item into sessionStorage. If the item already existed, it will overwrite the previous one. If the item did not exist, it will create a new item.

```javascript
const API = {
   arguments: {
      itemName: {
         required,
         format: 'populated string',
      },
      itemValue: {
         optional,
         format: any,
      },
   },
   returns: any,
}
```

**Examples:**

```javascript
session.setItem('foo', [1, 2, 3]);
session.setItem('firstName', 'Joe');

session.getItem('foo'); // returns [1, 2, 3]
session.getItem('firstName', 'Mary'); // return 'Joe'
```
