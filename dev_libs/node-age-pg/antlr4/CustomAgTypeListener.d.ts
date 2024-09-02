import { AgtypeListener } from './AgtypeListener';
import { FloatLiteralContext, FloatValueContext, IntegerValueContext, PairContext, StringValueContext } from './AgtypeParser';
import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
type MapOrArray = Map<string, any> | any[];
declare class CustomAgTypeListener implements AgtypeListener, ParseTreeListener {
    rootObject?: MapOrArray;
    objectInsider: MapOrArray[];
    prevObject?: MapOrArray;
    lastObject?: MapOrArray;
    lastValue: any;
    mergeArrayOrObject(key: string): void;
    mergeArray(): void;
    mergeObject(key: string): void;
    createNewObject(): void;
    createNewArray(): void;
    pushIfArray(value: any): boolean;
    exitStringValue(ctx: StringValueContext): void;
    exitIntegerValue(ctx: IntegerValueContext): void;
    exitFloatValue(ctx: FloatValueContext): void;
    exitTrueBoolean(): void;
    exitFalseBoolean(): void;
    exitNullValue(): void;
    exitFloatLiteral(ctx: FloatLiteralContext): void;
    enterObjectValue(): void;
    enterArrayValue(): void;
    exitObjectValue(): void;
    exitPair(ctx: PairContext): void;
    exitAgType(): void;
    stripQuotes(quotesString: string): any;
    getResult(): MapOrArray | undefined;
    enterEveryRule(): void;
    exitEveryRule(): void;
    visitErrorNode(): void;
    visitTerminal(): void;
}
export default CustomAgTypeListener;