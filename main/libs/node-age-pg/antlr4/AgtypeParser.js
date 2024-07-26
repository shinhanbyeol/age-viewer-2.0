"use strict";
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatLiteralContext = exports.TypeAnnotationContext = exports.ArrayContext = exports.PairContext = exports.ObjContext = exports.ArrayValueContext = exports.ObjectValueContext = exports.NullValueContext = exports.FalseBooleanContext = exports.TrueBooleanContext = exports.FloatValueContext = exports.IntegerValueContext = exports.StringValueContext = exports.ValueContext = exports.AgValueContext = exports.AgTypeContext = exports.AgtypeParser = void 0;
const ATNDeserializer_1 = require("antlr4ts/atn/ATNDeserializer");
const FailedPredicateException_1 = require("antlr4ts/FailedPredicateException");
const NoViableAltException_1 = require("antlr4ts/NoViableAltException");
const Parser_1 = require("antlr4ts/Parser");
const ParserRuleContext_1 = require("antlr4ts/ParserRuleContext");
const ParserATNSimulator_1 = require("antlr4ts/atn/ParserATNSimulator");
const RecognitionException_1 = require("antlr4ts/RecognitionException");
const VocabularyImpl_1 = require("antlr4ts/VocabularyImpl");
const Utils = __importStar(require("antlr4ts/misc/Utils"));
class AgtypeParser extends Parser_1.Parser {
    // @Override
    // @NotNull
    get vocabulary() {
        return AgtypeParser.VOCABULARY;
    }
    // tslint:enable:no-trailing-whitespace
    // @Override
    get grammarFileName() {
        return 'Agtype.g4';
    }
    // @Override
    get ruleNames() {
        return AgtypeParser.ruleNames;
    }
    // @Override
    get serializedATN() {
        return AgtypeParser._serializedATN;
    }
    createFailedPredicateException(predicate, message) {
        return new FailedPredicateException_1.FailedPredicateException(this, predicate, message);
    }
    constructor(input) {
        super(input);
        this._interp = new ParserATNSimulator_1.ParserATNSimulator(AgtypeParser._ATN, this);
    }
    // @RuleVersion(0)
    agType() {
        const _localctx = new AgTypeContext(this._ctx, this.state);
        this.enterRule(_localctx, 0, AgtypeParser.RULE_agType);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 16;
                this.agValue();
                this.state = 17;
                this.match(AgtypeParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    agValue() {
        const _localctx = new AgValueContext(this._ctx, this.state);
        this.enterRule(_localctx, 2, AgtypeParser.RULE_agValue);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 19;
                this.value();
                this.state = 21;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === AgtypeParser.T__9) {
                    {
                        this.state = 20;
                        this.typeAnnotation();
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    value() {
        let _localctx = new ValueContext(this._ctx, this.state);
        this.enterRule(_localctx, 4, AgtypeParser.RULE_value);
        try {
            this.state = 31;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case AgtypeParser.STRING:
                    _localctx = new StringValueContext(_localctx);
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 23;
                        this.match(AgtypeParser.STRING);
                    }
                    break;
                case AgtypeParser.INTEGER:
                    _localctx = new IntegerValueContext(_localctx);
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 24;
                        this.match(AgtypeParser.INTEGER);
                    }
                    break;
                case AgtypeParser.T__10:
                case AgtypeParser.T__11:
                case AgtypeParser.T__12:
                case AgtypeParser.RegularFloat:
                case AgtypeParser.ExponentFloat:
                    _localctx = new FloatValueContext(_localctx);
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 25;
                        this.floatLiteral();
                    }
                    break;
                case AgtypeParser.T__0:
                    _localctx = new TrueBooleanContext(_localctx);
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 26;
                        this.match(AgtypeParser.T__0);
                    }
                    break;
                case AgtypeParser.T__1:
                    _localctx = new FalseBooleanContext(_localctx);
                    this.enterOuterAlt(_localctx, 5);
                    {
                        this.state = 27;
                        this.match(AgtypeParser.T__1);
                    }
                    break;
                case AgtypeParser.T__2:
                    _localctx = new NullValueContext(_localctx);
                    this.enterOuterAlt(_localctx, 6);
                    {
                        this.state = 28;
                        this.match(AgtypeParser.T__2);
                    }
                    break;
                case AgtypeParser.T__3:
                    _localctx = new ObjectValueContext(_localctx);
                    this.enterOuterAlt(_localctx, 7);
                    {
                        this.state = 29;
                        this.obj();
                    }
                    break;
                case AgtypeParser.T__7:
                    _localctx = new ArrayValueContext(_localctx);
                    this.enterOuterAlt(_localctx, 8);
                    {
                        this.state = 30;
                        this.array();
                    }
                    break;
                default:
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    obj() {
        const _localctx = new ObjContext(this._ctx, this.state);
        this.enterRule(_localctx, 6, AgtypeParser.RULE_obj);
        let _la;
        try {
            this.state = 46;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 3, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 33;
                        this.match(AgtypeParser.T__3);
                        this.state = 34;
                        this.pair();
                        this.state = 39;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === AgtypeParser.T__4) {
                            {
                                {
                                    this.state = 35;
                                    this.match(AgtypeParser.T__4);
                                    this.state = 36;
                                    this.pair();
                                }
                            }
                            this.state = 41;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 42;
                        this.match(AgtypeParser.T__5);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 44;
                        this.match(AgtypeParser.T__3);
                        this.state = 45;
                        this.match(AgtypeParser.T__5);
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    pair() {
        const _localctx = new PairContext(this._ctx, this.state);
        this.enterRule(_localctx, 8, AgtypeParser.RULE_pair);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 48;
                this.match(AgtypeParser.STRING);
                this.state = 49;
                this.match(AgtypeParser.T__6);
                this.state = 50;
                this.agValue();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    array() {
        const _localctx = new ArrayContext(this._ctx, this.state);
        this.enterRule(_localctx, 10, AgtypeParser.RULE_array);
        let _la;
        try {
            this.state = 65;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 5, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 52;
                        this.match(AgtypeParser.T__7);
                        this.state = 53;
                        this.agValue();
                        this.state = 58;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === AgtypeParser.T__4) {
                            {
                                {
                                    this.state = 54;
                                    this.match(AgtypeParser.T__4);
                                    this.state = 55;
                                    this.agValue();
                                }
                            }
                            this.state = 60;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 61;
                        this.match(AgtypeParser.T__8);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 63;
                        this.match(AgtypeParser.T__7);
                        this.state = 64;
                        this.match(AgtypeParser.T__8);
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    typeAnnotation() {
        const _localctx = new TypeAnnotationContext(this._ctx, this.state);
        this.enterRule(_localctx, 12, AgtypeParser.RULE_typeAnnotation);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 67;
                this.match(AgtypeParser.T__9);
                this.state = 68;
                this.match(AgtypeParser.IDENT);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    floatLiteral() {
        const _localctx = new FloatLiteralContext(this._ctx, this.state);
        this.enterRule(_localctx, 14, AgtypeParser.RULE_floatLiteral);
        let _la;
        try {
            this.state = 77;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case AgtypeParser.RegularFloat:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 70;
                        this.match(AgtypeParser.RegularFloat);
                    }
                    break;
                case AgtypeParser.ExponentFloat:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 71;
                        this.match(AgtypeParser.ExponentFloat);
                    }
                    break;
                case AgtypeParser.T__10:
                case AgtypeParser.T__11:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 73;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (_la === AgtypeParser.T__10) {
                            {
                                this.state = 72;
                                this.match(AgtypeParser.T__10);
                            }
                        }
                        this.state = 75;
                        this.match(AgtypeParser.T__11);
                    }
                    break;
                case AgtypeParser.T__12:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 76;
                        this.match(AgtypeParser.T__12);
                    }
                    break;
                default:
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    static get _ATN() {
        if (!AgtypeParser.__ATN) {
            AgtypeParser.__ATN = new ATNDeserializer_1.ATNDeserializer().deserialize(Utils.toCharArray(AgtypeParser._serializedATN));
        }
        return AgtypeParser.__ATN;
    }
}
exports.AgtypeParser = AgtypeParser;
AgtypeParser.T__0 = 1;
AgtypeParser.T__1 = 2;
AgtypeParser.T__2 = 3;
AgtypeParser.T__3 = 4;
AgtypeParser.T__4 = 5;
AgtypeParser.T__5 = 6;
AgtypeParser.T__6 = 7;
AgtypeParser.T__7 = 8;
AgtypeParser.T__8 = 9;
AgtypeParser.T__9 = 10;
AgtypeParser.T__10 = 11;
AgtypeParser.T__11 = 12;
AgtypeParser.T__12 = 13;
AgtypeParser.IDENT = 14;
AgtypeParser.STRING = 15;
AgtypeParser.INTEGER = 16;
AgtypeParser.RegularFloat = 17;
AgtypeParser.ExponentFloat = 18;
AgtypeParser.WS = 19;
AgtypeParser.RULE_agType = 0;
AgtypeParser.RULE_agValue = 1;
AgtypeParser.RULE_value = 2;
AgtypeParser.RULE_obj = 3;
AgtypeParser.RULE_pair = 4;
AgtypeParser.RULE_array = 5;
AgtypeParser.RULE_typeAnnotation = 6;
AgtypeParser.RULE_floatLiteral = 7;
// tslint:disable:no-trailing-whitespace
AgtypeParser.ruleNames = [
    'agType', 'agValue', 'value', 'obj', 'pair', 'array', 'typeAnnotation',
    'floatLiteral'
];
AgtypeParser._LITERAL_NAMES = [
    undefined, "'true'", "'false'", "'null'", "'{'", "','", "'}'", "':'",
    "'['", "']'", "'::'", "'-'", "'Infinity'", "'NaN'"
];
AgtypeParser._SYMBOLIC_NAMES = [
    undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    'IDENT', 'STRING', 'INTEGER', 'RegularFloat', 'ExponentFloat', 'WS'
];
AgtypeParser.VOCABULARY = new VocabularyImpl_1.VocabularyImpl(AgtypeParser._LITERAL_NAMES, AgtypeParser._SYMBOLIC_NAMES, []);
AgtypeParser._serializedATN = '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x15R\x04\x02' +
    '\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07' +
    '\t\x07\x04\b\t\b\x04\t\t\t\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x05' +
    '\x03\x18\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04' +
    '\x03\x04\x05\x04"\n\x04\x03\x05\x03\x05\x03\x05\x03\x05\x07\x05(\n\x05' +
    '\f\x05\x0E\x05+\v\x05\x03\x05\x03\x05\x03\x05\x03\x05\x05\x051\n\x05\x03' +
    '\x06\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x03\x07\x07\x07;' +
    '\n\x07\f\x07\x0E\x07>\v\x07\x03\x07\x03\x07\x03\x07\x03\x07\x05\x07D\n' +
    '\x07\x03\b\x03\b\x03\b\x03\t\x03\t\x03\t\x05\tL\n\t\x03\t\x03\t\x05\t' +
    'P\n\t\x03\t\x02\x02\x02\n\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E' +
    '\x02\x10\x02\x02\x02\x02Y\x02\x12\x03\x02\x02\x02\x04\x15\x03\x02\x02' +
    '\x02\x06!\x03\x02\x02\x02\b0\x03\x02\x02\x02\n2\x03\x02\x02\x02\fC\x03' +
    '\x02\x02\x02\x0EE\x03\x02\x02\x02\x10O\x03\x02\x02\x02\x12\x13\x05\x04' +
    '\x03\x02\x13\x14\x07\x02\x02\x03\x14\x03\x03\x02\x02\x02\x15\x17\x05\x06' +
    '\x04\x02\x16\x18\x05\x0E\b\x02\x17\x16\x03\x02\x02\x02\x17\x18\x03\x02' +
    '\x02\x02\x18\x05\x03\x02\x02\x02\x19"\x07\x11\x02\x02\x1A"\x07\x12\x02' +
    '\x02\x1B"\x05\x10\t\x02\x1C"\x07\x03\x02\x02\x1D"\x07\x04\x02\x02\x1E' +
    '"\x07\x05\x02\x02\x1F"\x05\b\x05\x02 "\x05\f\x07\x02!\x19\x03\x02\x02' +
    '\x02!\x1A\x03\x02\x02\x02!\x1B\x03\x02\x02\x02!\x1C\x03\x02\x02\x02!\x1D' +
    '\x03\x02\x02\x02!\x1E\x03\x02\x02\x02!\x1F\x03\x02\x02\x02! \x03\x02\x02' +
    '\x02"\x07\x03\x02\x02\x02#$\x07\x06\x02\x02$)\x05\n\x06\x02%&\x07\x07' +
    "\x02\x02&(\x05\n\x06\x02\'%\x03\x02\x02\x02(+\x03\x02\x02\x02)\'\x03\x02" +
    '\x02\x02)*\x03\x02\x02\x02*,\x03\x02\x02\x02+)\x03\x02\x02\x02,-\x07\b' +
    '\x02\x02-1\x03\x02\x02\x02./\x07\x06\x02\x02/1\x07\b\x02\x020#\x03\x02' +
    '\x02\x020.\x03\x02\x02\x021\t\x03\x02\x02\x0223\x07\x11\x02\x0234\x07' +
    '\t\x02\x0245\x05\x04\x03\x025\v\x03\x02\x02\x0267\x07\n\x02\x027<\x05' +
    '\x04\x03\x0289\x07\x07\x02\x029;\x05\x04\x03\x02:8\x03\x02\x02\x02;>\x03' +
    '\x02\x02\x02<:\x03\x02\x02\x02<=\x03\x02\x02\x02=?\x03\x02\x02\x02><\x03' +
    '\x02\x02\x02?@\x07\v\x02\x02@D\x03\x02\x02\x02AB\x07\n\x02\x02BD\x07\v' +
    '\x02\x02C6\x03\x02\x02\x02CA\x03\x02\x02\x02D\r\x03\x02\x02\x02EF\x07' +
    '\f\x02\x02FG\x07\x10\x02\x02G\x0F\x03\x02\x02\x02HP\x07\x13\x02\x02IP' +
    '\x07\x14\x02\x02JL\x07\r\x02\x02KJ\x03\x02\x02\x02KL\x03\x02\x02\x02L' +
    'M\x03\x02\x02\x02MP\x07\x0E\x02\x02NP\x07\x0F\x02\x02OH\x03\x02\x02\x02' +
    'OI\x03\x02\x02\x02OK\x03\x02\x02\x02ON\x03\x02\x02\x02P\x11\x03\x02\x02' +
    '\x02\n\x17!)0<CKO';
class AgTypeContext extends ParserRuleContext_1.ParserRuleContext {
    agValue() {
        return this.getRuleContext(0, AgValueContext);
    }
    EOF() {
        return this.getToken(AgtypeParser.EOF, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return AgtypeParser.RULE_agType;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterAgType) {
            listener.enterAgType(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAgType) {
            listener.exitAgType(this);
        }
    }
}
exports.AgTypeContext = AgTypeContext;
class AgValueContext extends ParserRuleContext_1.ParserRuleContext {
    value() {
        return this.getRuleContext(0, ValueContext);
    }
    typeAnnotation() {
        return this.tryGetRuleContext(0, TypeAnnotationContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return AgtypeParser.RULE_agValue;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterAgValue) {
            listener.enterAgValue(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAgValue) {
            listener.exitAgValue(this);
        }
    }
}
exports.AgValueContext = AgValueContext;
class ValueContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return AgtypeParser.RULE_value;
    }
    copyFrom(ctx) {
        super.copyFrom(ctx);
    }
}
exports.ValueContext = ValueContext;
class StringValueContext extends ValueContext {
    STRING() {
        return this.getToken(AgtypeParser.STRING, 0);
    }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterStringValue) {
            listener.enterStringValue(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitStringValue) {
            listener.exitStringValue(this);
        }
    }
}
exports.StringValueContext = StringValueContext;
class IntegerValueContext extends ValueContext {
    INTEGER() {
        return this.getToken(AgtypeParser.INTEGER, 0);
    }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterIntegerValue) {
            listener.enterIntegerValue(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitIntegerValue) {
            listener.exitIntegerValue(this);
        }
    }
}
exports.IntegerValueContext = IntegerValueContext;
class FloatValueContext extends ValueContext {
    floatLiteral() {
        return this.getRuleContext(0, FloatLiteralContext);
    }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterFloatValue) {
            listener.enterFloatValue(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitFloatValue) {
            listener.exitFloatValue(this);
        }
    }
}
exports.FloatValueContext = FloatValueContext;
class TrueBooleanContext extends ValueContext {
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterTrueBoolean) {
            listener.enterTrueBoolean(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitTrueBoolean) {
            listener.exitTrueBoolean(this);
        }
    }
}
exports.TrueBooleanContext = TrueBooleanContext;
class FalseBooleanContext extends ValueContext {
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterFalseBoolean) {
            listener.enterFalseBoolean(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitFalseBoolean) {
            listener.exitFalseBoolean(this);
        }
    }
}
exports.FalseBooleanContext = FalseBooleanContext;
class NullValueContext extends ValueContext {
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterNullValue) {
            listener.enterNullValue(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitNullValue) {
            listener.exitNullValue(this);
        }
    }
}
exports.NullValueContext = NullValueContext;
class ObjectValueContext extends ValueContext {
    obj() {
        return this.getRuleContext(0, ObjContext);
    }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterObjectValue) {
            listener.enterObjectValue(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitObjectValue) {
            listener.exitObjectValue(this);
        }
    }
}
exports.ObjectValueContext = ObjectValueContext;
class ArrayValueContext extends ValueContext {
    array() {
        return this.getRuleContext(0, ArrayContext);
    }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterArrayValue) {
            listener.enterArrayValue(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitArrayValue) {
            listener.exitArrayValue(this);
        }
    }
}
exports.ArrayValueContext = ArrayValueContext;
class ObjContext extends ParserRuleContext_1.ParserRuleContext {
    pair(i) {
        if (i === undefined) {
            return this.getRuleContexts(PairContext);
        }
        else {
            return this.getRuleContext(i, PairContext);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return AgtypeParser.RULE_obj;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterObj) {
            listener.enterObj(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitObj) {
            listener.exitObj(this);
        }
    }
}
exports.ObjContext = ObjContext;
class PairContext extends ParserRuleContext_1.ParserRuleContext {
    STRING() {
        return this.getToken(AgtypeParser.STRING, 0);
    }
    agValue() {
        return this.getRuleContext(0, AgValueContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return AgtypeParser.RULE_pair;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterPair) {
            listener.enterPair(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitPair) {
            listener.exitPair(this);
        }
    }
}
exports.PairContext = PairContext;
class ArrayContext extends ParserRuleContext_1.ParserRuleContext {
    agValue(i) {
        if (i === undefined) {
            return this.getRuleContexts(AgValueContext);
        }
        else {
            return this.getRuleContext(i, AgValueContext);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return AgtypeParser.RULE_array;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterArray) {
            listener.enterArray(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitArray) {
            listener.exitArray(this);
        }
    }
}
exports.ArrayContext = ArrayContext;
class TypeAnnotationContext extends ParserRuleContext_1.ParserRuleContext {
    IDENT() {
        return this.getToken(AgtypeParser.IDENT, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return AgtypeParser.RULE_typeAnnotation;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterTypeAnnotation) {
            listener.enterTypeAnnotation(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitTypeAnnotation) {
            listener.exitTypeAnnotation(this);
        }
    }
}
exports.TypeAnnotationContext = TypeAnnotationContext;
class FloatLiteralContext extends ParserRuleContext_1.ParserRuleContext {
    RegularFloat() {
        return this.tryGetToken(AgtypeParser.RegularFloat, 0);
    }
    ExponentFloat() {
        return this.tryGetToken(AgtypeParser.ExponentFloat, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return AgtypeParser.RULE_floatLiteral;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterFloatLiteral) {
            listener.enterFloatLiteral(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitFloatLiteral) {
            listener.exitFloatLiteral(this);
        }
    }
}
exports.FloatLiteralContext = FloatLiteralContext;
