/*
 *  Copyright (C) 2017 OrionStar Technology Project
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import {
    BaseViewModel,
    speechApi,
    TextListener
} from 'orionos-eve-core';
import { SpeechModel } from './SpeechModel';

export class SpeechViewModel extends BaseViewModel {

    //用户输入的文字
    private mInputText: string;

    //数据模块
    private mModel: SpeechModel;

    //构造函数
    public constructor() {
        super('SpeechViewModel');
        this.mInputText = '';
        this.mModel = new SpeechModel();
    }

    /**
     * 开始
     */
    public onStart(): void {

    }

    /**
     * 结束
     */
    public onStop(): void {

    }

    /**
     * 输入内容改变
     */
    public onChangeText = (text: string): void => {
        this.mInputText = text;
    };

    /**
     * 播放语音
     */
    public onClickPlatText = (): void => {
        let textListener = new TextListener();
        textListener.addListener(TextListener.EVENT_START, (): void => {
            this.mModel.appendResultText('开始播放');
        });
        textListener.setFinish((): void => {
            this.mModel.appendResultText('播放结束');
        });
        speechApi.playText(textListener.getId(), this.mInputText);
    };

    /**
     * 停止语音
     */
    public onClickStopPlayText = (): void => {
        speechApi.stopTTS();
    };

    /**
     * 获取运行结果
     */
    public getText(): string {
        return this.mModel.getResultText();
    }


}