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
Object.defineProperty(exports, "__esModule", { value: true });
class CustomAgTypeListener {
    constructor() {
        this.objectInsider = [];
        this.lastValue = undefined;
    }
    mergeArrayOrObject(key) {
        if (this.prevObject instanceof Array) {
            this.mergeArray();
        }
        else {
            this.mergeObject(key);
        }
    }
    mergeArray() {
        if (this.prevObject !== undefined && this.lastObject !== undefined && this.prevObject instanceof Array) {
            this.prevObject.push(this.lastObject);
            this.lastObject = this.prevObject;
            this.objectInsider.shift();
            this.prevObject = this.objectInsider[1];
        }
    }
    mergeObject(key) {
        if (this.prevObject !== undefined && this.lastObject !== undefined && this.prevObject instanceof Map) {
            this.prevObject.set(key, this.lastObject);
            this.lastObject = this.prevObject;
            this.objectInsider.shift();
            this.prevObject = this.objectInsider[1];
        }
    }
    createNewObject() {
        const newObject = new Map();
        this.objectInsider.unshift(newObject);
        this.prevObject = this.lastObject;
        this.lastObject = newObject;
    }
    createNewArray() {
        const newObject = [];
        this.objectInsider.unshift(newObject);
        this.prevObject = this.lastObject;
        this.lastObject = newObject;
    }
    pushIfArray(value) {
        if (this.lastObject instanceof Array) {
            this.lastObject.push(value);
            return true;
        }
        return false;
    }
    exitStringValue(ctx) {
        const value = this.stripQuotes(ctx.text);
        if (!this.pushIfArray(value)) {
            this.lastValue = value;
        }
    }
    exitIntegerValue(ctx) {
        const value = parseInt(ctx.text);
        if (!this.pushIfArray(value)) {
            this.lastValue = value;
        }
    }
    exitFloatValue(ctx) {
        const value = parseFloat(ctx.text);
        if (!this.pushIfArray(value)) {
            this.lastValue = value;
        }
    }
    exitTrueBoolean() {
        const value = true;
        if (!this.pushIfArray(value)) {
            this.lastValue = value;
        }
    }
    exitFalseBoolean() {
        const value = false;
        if (!this.pushIfArray(value)) {
            this.lastValue = value;
        }
    }
    exitNullValue() {
        const value = null;
        if (!this.pushIfArray(value)) {
            this.lastValue = value;
        }
    }
    exitFloatLiteral(ctx) {
        const value = ctx.text;
        if (!this.pushIfArray(value)) {
            this.lastValue = value;
        }
    }
    enterObjectValue() {
        this.createNewObject();
    }
    enterArrayValue() {
        this.createNewArray();
    }
    exitObjectValue() {
        this.mergeArray();
    }
    exitPair(ctx) {
        const name = this.stripQuotes(ctx.STRING().text);
        if (this.lastValue !== undefined) {
            this.lastObject.set(name, this.lastValue);
            this.lastValue = undefined;
        }
        else {
            this.mergeArrayOrObject(name);
        }
    }
    exitAgType() {
        this.rootObject = this.objectInsider.shift();
    }
    stripQuotes(quotesString) {
        return JSON.parse(quotesString);
    }
    getResult() {
        this.objectInsider = [];
        this.prevObject = undefined;
        this.lastObject = undefined;
        if (!this.rootObject) {
            this.rootObject = this.lastValue;
        }
        this.lastValue = undefined;
        return this.rootObject;
    }
    enterEveryRule() {
    }
    exitEveryRule() {
    }
    visitErrorNode() {
    }
    visitTerminal() {
    }
}
exports.default = CustomAgTypeListener;
