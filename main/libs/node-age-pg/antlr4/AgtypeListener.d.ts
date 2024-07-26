import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
import { AgTypeContext, AgValueContext, ArrayContext, ArrayValueContext, FalseBooleanContext, FloatLiteralContext, FloatValueContext, IntegerValueContext, NullValueContext, ObjContext, ObjectValueContext, PairContext, StringValueContext, TrueBooleanContext, TypeAnnotationContext, ValueContext } from './AgtypeParser';
/**
 * This interface defines a complete listener for a parse tree produced by
 * `AgtypeParser`.
 */
export interface AgtypeListener extends ParseTreeListener {
    /**
     * Enter a parse tree produced by the `StringValue`
     * labeled alternative in `AgtypeParser.value`.
     * @param ctx the parse tree
     */
    enterStringValue?: (ctx: StringValueContext) => void;
    /**
     * Exit a parse tree produced by the `StringValue`
     * labeled alternative in `AgtypeParser.value`.
     * @param ctx the parse tree
     */
    exitStringValue?: (ctx: StringValueContext) => void;
    /**
     * Enter a parse tree produced by the `IntegerValue`
     * labeled alternative in `AgtypeParser.value`.
     * @param ctx the parse tree
     */
    enterIntegerValue?: (ctx: IntegerValueContext) => void;
    /**
     * Exit a parse tree produced by the `IntegerValue`
     * labeled alternative in `AgtypeParser.value`.
     * @param ctx the parse tree
     */
    exitIntegerValue?: (ctx: IntegerValueContext) => void;
    /**
     * Enter a parse tree produced by the `FloatValue`
     * labeled alternative in `AgtypeParser.value`.
     * @param ctx the parse tree
     */
    enterFloatValue?: (ctx: FloatValueContext) => void;
    /**
     * Exit a parse tree produced by the `FloatValue`
     * labeled alternative in `AgtypeParser.value`.
     * @param ctx the parse tree
     */
    exitFloatValue?: (ctx: FloatValueContext) => void;
    /**
     * Enter a parse tree produced by the `TrueBoolean`
     * labeled alternative in `AgtypeParser.value`.
     * @param ctx the parse tree
     */
    enterTrueBoolean?: (ctx: TrueBooleanContext) => void;
    /**
     * Exit a parse tree produced by the `TrueBoolean`
     * labeled alternative in `AgtypeParser.value`.
     * @param ctx the parse tree
     */
    exitTrueBoolean?: (ctx: TrueBooleanContext) => void;
    /**
     * Enter a parse tree produced by the `FalseBoolean`
     * labeled alternative in `AgtypeParser.value`.
     * @param ctx the parse tree
     */
    enterFalseBoolean?: (ctx: FalseBooleanContext) => void;
    /**
     * Exit a parse tree produced by the `FalseBoolean`
     * labeled alternative in `AgtypeParser.value`.
     * @param ctx the parse tree
     */
    exitFalseBoolean?: (ctx: FalseBooleanContext) => void;
    /**
     * Enter a parse tree produced by the `NullValue`
     * labeled alternative in `AgtypeParser.value`.
     * @param ctx the parse tree
     */
    enterNullValue?: (ctx: NullValueContext) => void;
    /**
     * Exit a parse tree produced by the `NullValue`
     * labeled alternative in `AgtypeParser.value`.
     * @param ctx the parse tree
     */
    exitNullValue?: (ctx: NullValueContext) => void;
    /**
     * Enter a parse tree produced by the `ObjectValue`
     * labeled alternative in `AgtypeParser.value`.
     * @param ctx the parse tree
     */
    enterObjectValue?: (ctx: ObjectValueContext) => void;
    /**
     * Exit a parse tree produced by the `ObjectValue`
     * labeled alternative in `AgtypeParser.value`.
     * @param ctx the parse tree
     */
    exitObjectValue?: (ctx: ObjectValueContext) => void;
    /**
     * Enter a parse tree produced by the `ArrayValue`
     * labeled alternative in `AgtypeParser.value`.
     * @param ctx the parse tree
     */
    enterArrayValue?: (ctx: ArrayValueContext) => void;
    /**
     * Exit a parse tree produced by the `ArrayValue`
     * labeled alternative in `AgtypeParser.value`.
     * @param ctx the parse tree
     */
    exitArrayValue?: (ctx: ArrayValueContext) => void;
    /**
     * Enter a parse tree produced by `AgtypeParser.agType`.
     * @param ctx the parse tree
     */
    enterAgType?: (ctx: AgTypeContext) => void;
    /**
     * Exit a parse tree produced by `AgtypeParser.agType`.
     * @param ctx the parse tree
     */
    exitAgType?: (ctx: AgTypeContext) => void;
    /**
     * Enter a parse tree produced by `AgtypeParser.agValue`.
     * @param ctx the parse tree
     */
    enterAgValue?: (ctx: AgValueContext) => void;
    /**
     * Exit a parse tree produced by `AgtypeParser.agValue`.
     * @param ctx the parse tree
     */
    exitAgValue?: (ctx: AgValueContext) => void;
    /**
     * Enter a parse tree produced by `AgtypeParser.value`.
     * @param ctx the parse tree
     */
    enterValue?: (ctx: ValueContext) => void;
    /**
     * Exit a parse tree produced by `AgtypeParser.value`.
     * @param ctx the parse tree
     */
    exitValue?: (ctx: ValueContext) => void;
    /**
     * Enter a parse tree produced by `AgtypeParser.obj`.
     * @param ctx the parse tree
     */
    enterObj?: (ctx: ObjContext) => void;
    /**
     * Exit a parse tree produced by `AgtypeParser.obj`.
     * @param ctx the parse tree
     */
    exitObj?: (ctx: ObjContext) => void;
    /**
     * Enter a parse tree produced by `AgtypeParser.pair`.
     * @param ctx the parse tree
     */
    enterPair?: (ctx: PairContext) => void;
    /**
     * Exit a parse tree produced by `AgtypeParser.pair`.
     * @param ctx the parse tree
     */
    exitPair?: (ctx: PairContext) => void;
    /**
     * Enter a parse tree produced by `AgtypeParser.array`.
     * @param ctx the parse tree
     */
    enterArray?: (ctx: ArrayContext) => void;
    /**
     * Exit a parse tree produced by `AgtypeParser.array`.
     * @param ctx the parse tree
     */
    exitArray?: (ctx: ArrayContext) => void;
    /**
     * Enter a parse tree produced by `AgtypeParser.typeAnnotation`.
     * @param ctx the parse tree
     */
    enterTypeAnnotation?: (ctx: TypeAnnotationContext) => void;
    /**
     * Exit a parse tree produced by `AgtypeParser.typeAnnotation`.
     * @param ctx the parse tree
     */
    exitTypeAnnotation?: (ctx: TypeAnnotationContext) => void;
    /**
     * Enter a parse tree produced by `AgtypeParser.floatLiteral`.
     * @param ctx the parse tree
     */
    enterFloatLiteral?: (ctx: FloatLiteralContext) => void;
    /**
     * Exit a parse tree produced by `AgtypeParser.floatLiteral`.
     * @param ctx the parse tree
     */
    exitFloatLiteral?: (ctx: FloatLiteralContext) => void;
}
