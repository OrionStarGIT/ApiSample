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

import * as React from 'react';
import {
    BaseComponent,
    BaseComponentProps,
    BaseVoice
} from 'orionos-eve-core';
import { observer } from 'mobx-react';
import {
    Button,
    StyleSheet,
    View,
    TextInput,
    SafeAreaView,
    ScrollView,
    Text
} from 'react-native';
import { SpeechViewModel } from './SpeechViewModel';
import { SpeechVoice } from './SpeechVoice';

/**
 * 界面样式
 */
const styles = StyleSheet.create({
    rootView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    rowView: {
        flexDirection: 'row',
        width: '90%',
        marginBottom: 10
    },
    textInput: {
        flex: 1,
        width: '50%',
        borderBottomColor: 'dodgerblue',
        borderBottomWidth: 2,
        padding: 0
    },
    resultArea: {
        flex: 1,
        width: '90%',
        marginBottom: 20,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'dodgerblue',
        alignItems: 'center'
    },
    resultScroll: {
        width: '90%',
        height: '100%'
    },
    resultText: {
        fontSize: 12,
        alignSelf: 'center',
        width: '100%',
        height: '100%'
    },
    button: {
        marginLeft: 10
    }
});

@observer
export class SpeechScreen
    extends BaseComponent<BaseComponentProps, SpeechViewModel, BaseVoice> {

    private mScroll?: ScrollView;

    /**
     * 构造函数
     * @param props-传入参数
     */
    public constructor(props: BaseComponentProps) {
        super(props);

        let viewModel = new SpeechViewModel();
        this.setVoice(new SpeechVoice(viewModel));
        this.setViewModel(viewModel);
    }

    /**
     * 绘制界面
     */
    public render(): React.ReactNode {
        if (!this.viewModel) {
            return;
        }
        return (
            <View style={styles.rootView}>
                <View style={styles.rowView}>
                    <TextInput
                        selectionColor={'dodgerblue'}
                        style={styles.textInput}
                        onChangeText={this.viewModel.onChangeText}/>
                    <View style={styles.button}>
                        <Button
                            color={'dodgerblue'}
                            title={'播放'}
                            onPress={this.viewModel.onClickPlatText}/>
                    </View>
                    <View style={styles.button}>
                        <Button
                            color={'dodgerblue'}
                            title={'停止'}
                            onPress={this.viewModel.onClickStopPlayText}/>
                    </View>
                </View>
                <SafeAreaView style={styles.resultArea}>
                    <ScrollView
                        ref={this.setScroll}
                        onContentSizeChange={this.onContentSizeChange}
                        style={styles.resultScroll}
                        showsVerticalScrollIndicator={false}>
                        <Text style={styles.resultText}>
                            {this.viewModel.getText()}
                        </Text>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }

    private setScroll = (scroll: ScrollView): void => {
        this.mScroll = scroll;
    };

    private onContentSizeChange = (): void => {
        this.mScroll && this.mScroll.scrollToEnd();
    }
}