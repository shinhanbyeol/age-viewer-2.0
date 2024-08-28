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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AGTypeParse = exports.setAGETypes = void 0;
const antlr4ts_1 = require("antlr4ts");
const AgtypeLexer_1 = require("./antlr4/AgtypeLexer");
const AgtypeParser_1 = require("./antlr4/AgtypeParser");
const CustomAgTypeListener_1 = __importDefault(require("./antlr4/CustomAgTypeListener"));
const tree_1 = require("antlr4ts/tree");
function AGTypeParse(input) {
    const chars = antlr4ts_1.CharStreams.fromString(input);
    const lexer = new AgtypeLexer_1.AgtypeLexer(chars);
    const tokens = new antlr4ts_1.CommonTokenStream(lexer);
    const parser = new AgtypeParser_1.AgtypeParser(tokens);
    const tree = parser.agType();
    const printer = new CustomAgTypeListener_1.default();
    tree_1.ParseTreeWalker.DEFAULT.walk(printer, tree);
    return printer.getResult();
}
exports.AGTypeParse = AGTypeParse;
function setAGETypes(client, types) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.query(`
        CREATE EXTENSION IF NOT EXISTS age;
        LOAD 'age';
        SET search_path = ag_catalog, "$user", public;
    `);
        const oidResults = yield client.query(`
        select typelem
        from pg_type
        where typname = '_agtype';`);
        if (oidResults.rows.length < 1) {
            throw new Error();
        }
        types.setTypeParser(oidResults.rows[0].typelem, AGTypeParse);
    });
}
exports.setAGETypes = setAGETypes;
