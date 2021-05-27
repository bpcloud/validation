
Some typescript decorators, like spring-validation and so on.

- [Setup](#setup)
- [Example](#example)
- [like java spring validation](#like-java-spring-validation)
  - [Null value validator](#null-value-validator)
  - [Boolean validator](#boolean-validator)
  - [Number validator](#number-validator)
  - [String validator](#string-validator)
  - [Time validator](#time-validator)
- [Enum validator](#enum-validator)
- [Type validator](#type-validator)
- [Custom validator](#custom-validator)

## Setup

```
npm i @bpframework/validation
```

set config in tsconfig.json

```
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```

## Example

```js
import {NotNull, Type} from '@bpframework/validation';

class BeanA {
  @NotNull
  @Type.Boolean
  a: boolean = null;
}

// will throw a exception: 
//  - febs.exception('message', febs.exception.PARAM, __filename, __line, __column);
let obj = new BeanA();

// will throw a exception
obj.a = null;
obj.a = undefined;
```

**!!!WARNING: The following code does not trigger a validity check**

```js
class BeanA {
  @NotNull
  a: boolean;
}

// No exception is thrown.
let obj = new BeanA();

// Will throw a exception (trigger by settter)
obj.a = null;
```

> **<font color=#ff0000>All validate decorators have a corresponding array validation method<br>, e.g. `@Max.List` use to validator array</font>**

## like java spring validation

### Null value validator

| 名称                              | 作用                                                                                             | 例子                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `@Null`                           | must be null or undefined.                                                                       | @Null({message: "must is null"})      |
| `@NotNull`                        | cannot be null or undefined.                                                                     | @NotNull({message: "cannot be null"}) |
| `@NotBlank`                       | must contain a non-null char<br> trim(str).length>0                                              | @NotBlank                             |
| `@NotEmpty`                       | cannot be null or undefined, and the length is greater then 0<br> (o.size() > 0 或 o.length > 0) | @NotEmpty                             |
| `@Size`({max:number, min:number}) | check the length of a string or array<br> (o.size() 或 o.length)                                 | &nbsp;                                |

### Boolean validator

| 名称           | 作用          | 例子                                     |
| -------------- | ------------- | ---------------------------------------- |
| `@AssertFalse` | must be false | @AssertFalse({message: "must be false"}) |
| `@AssertTrue`  | muse be true  | @AssertTrue({message: "muse be true"})   |

### Number validator

| 名称                                                         | 作用                                                                | 例子                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------------- | ------------------------------------------- |
| `@DecimalMax`({value:number &brvbar; string})                | Number value must be less than or equal to the specified value      | @DecimalMax({value:1000, message: "error"}) |
| `@DecimalMin`({value:number &brvbar; string})                | Number value must be greater than or equal to the specified value   | @DecimalMin({value:0, message: "error"})    |
| `@Max`({value:number &brvbar; string})                       | Integer value must be less than or equal to the specified value.    | @Max({value:1000, message: "error"})        |
| `@Min`({value:number &brvbar; string})                       | Integer value must be greater than or equal to the specified value. | @Min({value:1000, message: "error"})        |
| [unsupported] ~~@Digits({integer:number, fraction:number})~~ | unsupported                                                         | @Digits({integer:5, fraction:1})            |
| `@Negative`                                                  | Number value must be negative                                       | &nbsp;                                      |
| `@NegativeOrZero`                                            | Number value must be negative or zero                               | &nbsp;                                      |
| `@Positive`                                                  | Number value must be positive                                       | &nbsp;                                      |
| `@PositiveOrZero`                                            | Number value must be positive or zero                               | &nbsp;                                      |
| `@Range`({min:number=0, max:number})                         | check the range of number value                                     | &nbsp;                                      |


### String validator

| 名称                        | 作用                                                            | 例子                    |
| --------------------------- | --------------------------------------------------------------- | ----------------------- |
| `@Email`({regexp:RegExp})   | Whether the specified value is Email. You can specify a regular | @Email({regexp:/.*/})   |
| `@Pattern`({regexp:RegExp}) | Whether the specified value matches regular                     | @Pattern({regexp:/.*/}) |


### Time validator

| 名称               | 作用                         | 例子   |
| ------------------ | ---------------------------- | ------ |
| `@Future`          | Date value is the future time       | &nbsp; |
| `@FutureOrPresent` | Date value is the future time or now | &nbsp; |
| `@Past`            | Date value is the past time       | &nbsp; |
| `@PastOrPresent`   | Date value is the past time or now | &nbsp; |

## Enum validator

| 名称                                 | 作用                            |
| ------------------------------------ | ------------------------------- |
| `@Enum`({allows: [v1, v2, v3, ...]}) | Verify the value is one of the allowed values.   |
| `@Type.Enum`({enumType: EnumName})   | Verify the value is enum type. |

`@Type.Enum` example:

```js
import {Type} from '@bpframework/validation';

enum Enum1 {
  a = '2323',
  b = 'xxxx'
}

class BeanA {
  @Type.Enum({enumType: Enum1 })
  a: any = null;
}
let obj = new BeanA();

obj.a = Enum1.a;  // ok.
obj.a = Enum1.b;  // ok.
obj.a = 1;  // will throw a exception.
```

## Type validator

| 名称            | 作用                     |
| --------------- | ------------------------ |
| `@Type.Boolean` | Verify that the value is a Boolean. |
| `@Type.Number`  | Verify that the value is a Number.      |
| `@Type.Integer` | Verify that the value is a Integer.  |
| `@Type.BigInt`  | Verify that the value is a Big-Integer.    |
| `@Type.String`  | Verify that the value is a String.    |
| `@Type.Date`    | Verify that the value is a Date or Date-string.      |
| `@Type.Object`  | Verify that the value is a Object.    |
| `@Type.Array`   | Verify that the value is a Array.      |

## Custom validator

| 名称              | 作用          |
| ----------------- | ------------- |
| `@Type.Validator` | Custom validator. |


```js
// validator value == 1
@Type.Validator({
  checkCB(value:any) {
    if (value !== 1) return false;
  }
})
value: number;
```