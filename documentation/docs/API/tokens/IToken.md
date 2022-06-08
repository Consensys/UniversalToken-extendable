## `IToken`



A standard interface all token standards must inherit from. Provides token standard agnostic
functions


### `tokenTransfer(struct TransferData transfer) → bool` (external)

Perform a transfer given a TransferData struct. Only addresses with the token controllers
role should be able to invoke this function.




### `tokenStandard() → enum TokenStandard` (external)

A function to determine what token standard this token implements. This
is a pure function, meaning the value should not change







