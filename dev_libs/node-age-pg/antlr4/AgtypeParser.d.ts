import { ATN } from 'antlr4ts/atn/ATN';
import { FailedPredicateException } from 'antlr4ts/FailedPredicateException';
import { Parser } from 'antlr4ts/Parser';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { TokenStream } from 'antlr4ts/TokenStream';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { AgtypeListener } from './AgtypeListener';
export declare class AgtypeParser extends Parser {
    static readonly T__0 = 1;
    static readonly T__1 = 2;
    static readonly T__2 = 3;
    static readonly T__3 = 4;
    static readonly T__4 = 5;
    static readonly T__5 = 6;
    static readonly T__6 = 7;
    static readonly T__7 = 8;
    static readonly T__8 = 9;
    static readonly T__9 = 10;
    static readonly T__10 = 11;
    static readonly T__11 = 12;
    static readonly T__12 = 13;
    static readonly IDENT = 14;
    static readonly STRING = 15;
    static readonly INTEGER = 16;
    static readonly RegularFloat = 17;
    static readonly ExponentFloat = 18;
    static readonly WS = 19;
    static readonly RULE_agType = 0;
    static readonly RULE_agValue = 1;
    static readonly RULE_value = 2;
    static readonly RULE_obj = 3;
    static readonly RULE_pair = 4;
    static readonly RULE_array = 5;
    static readonly RULE_typeAnnotation = 6;
    static readonly RULE_floatLiteral = 7;
    static readonly ruleNames: string[];
    private static readonly _LITERAL_NAMES;
    private static readonly _SYMBOLIC_NAMES;
    static readonly VOCABULARY: Vocabulary;
    get vocabulary(): Vocabulary;
    get grammarFileName(): string;
    get ruleNames(): string[];
    get serializedATN(): string;
    protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException;
    constructor(input: TokenStream);
    agType(): AgTypeContext;
    agValue(): AgValueContext;
    value(): ValueContext;
    obj(): ObjContext;
    pair(): PairContext;
    array(): ArrayContext;
    typeAnnotation(): TypeAnnotationContext;
    floatLiteral(): FloatLiteralContext;
    static readonly _serializedATN: string;
    static __ATN: ATN;
    static get _ATN(): ATN;
}
export declare class AgTypeContext extends ParserRuleContext {
    agValue(): AgValueContext;
    EOF(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: AgtypeListener): void;
    exitRule(listener: AgtypeListener): void;
}
export declare class AgValueContext extends ParserRuleContext {
    value(): ValueContext;
    typeAnnotation(): TypeAnnotationContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: AgtypeListener): void;
    exitRule(listener: AgtypeListener): void;
}
export declare class ValueContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    copyFrom(ctx: ValueContext): void;
}
export declare class StringValueContext extends ValueContext {
    STRING(): TerminalNode;
    constructor(ctx: ValueContext);
    enterRule(listener: AgtypeListener): void;
    exitRule(listener: AgtypeListener): void;
}
export declare class IntegerValueContext extends ValueContext {
    INTEGER(): TerminalNode;
    constructor(ctx: ValueContext);
    enterRule(listener: AgtypeListener): void;
    exitRule(listener: AgtypeListener): void;
}
export declare class FloatValueContext extends ValueContext {
    floatLiteral(): FloatLiteralContext;
    constructor(ctx: ValueContext);
    enterRule(listener: AgtypeListener): void;
    exitRule(listener: AgtypeListener): void;
}
export declare class TrueBooleanContext extends ValueContext {
    constructor(ctx: ValueContext);
    enterRule(listener: AgtypeListener): void;
    exitRule(listener: AgtypeListener): void;
}
export declare class FalseBooleanContext extends ValueContext {
    constructor(ctx: ValueContext);
    enterRule(listener: AgtypeListener): void;
    exitRule(listener: AgtypeListener): void;
}
export declare class NullValueContext extends ValueContext {
    constructor(ctx: ValueContext);
    enterRule(listener: AgtypeListener): void;
    exitRule(listener: AgtypeListener): void;
}
export declare class ObjectValueContext extends ValueContext {
    obj(): ObjContext;
    constructor(ctx: ValueContext);
    enterRule(listener: AgtypeListener): void;
    exitRule(listener: AgtypeListener): void;
}
export declare class ArrayValueContext extends ValueContext {
    array(): ArrayContext;
    constructor(ctx: ValueContext);
    enterRule(listener: AgtypeListener): void;
    exitRule(listener: AgtypeListener): void;
}
export declare class ObjContext extends ParserRuleContext {
    pair(): PairContext[];
    pair(i: number): PairContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: AgtypeListener): void;
    exitRule(listener: AgtypeListener): void;
}
export declare class PairContext extends ParserRuleContext {
    STRING(): TerminalNode;
    agValue(): AgValueContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: AgtypeListener): void;
    exitRule(listener: AgtypeListener): void;
}
export declare class ArrayContext extends ParserRuleContext {
    agValue(): AgValueContext[];
    agValue(i: number): AgValueContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: AgtypeListener): void;
    exitRule(listener: AgtypeListener): void;
}
export declare class TypeAnnotationContext extends ParserRuleContext {
    IDENT(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: AgtypeListener): void;
    exitRule(listener: AgtypeListener): void;
}
export declare class FloatLiteralContext extends ParserRuleContext {
    RegularFloat(): TerminalNode | undefined;
    ExponentFloat(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: AgtypeListener): void;
    exitRule(listener: AgtypeListener): void;
}
