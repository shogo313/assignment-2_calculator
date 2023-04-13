
'use strict';
//演算子(+-*/)入力前までの数字
let Input ='';
//最後に入力した演算子(+-*/)までの数式
let totalInput ='';
//計算結果
let result = 0;
//Inputのゼロ制御用(01→1)
let num = 0;
//一回前に入力されたものは 0:数字 1:演算子 2:小数点
let flg = 1;
//0:整数入力時 1:少数入力時
let decimalMode = 0;
//ディスプレイ
const display = $('#display');
//初期状態ではボタン(*,/,=)を非活性化
const disabledElements = $('.initialState_disabled');
disabledElements.prop('disabled', true);

//数字の入力
function numberClick(addNumber){
    disabledElements.prop('disabled', false);
    flg = 0;
    Input += addNumber.value;
    num = Number(Input);
    if(decimalMode === 1){
        display.html(totalInput + Input);
    }else{
        display.html(totalInput + num);
    }
}

//小数点の入力
function decimalClick(addDecimal){
     //少数入力モード時は演算子が入力されるかクリアされるまで小数点の入力不可)
     if(decimalMode === 1){
        Input += '';
    }
    //直前が数字
    else if(flg === 0){
        Input = num + addDecimal.value;
        flg = 2;
        decimalMode = 1;
    }
    //直前が演算子、もしくは初期状態
    else if(flg === 1){
        disabledElements.prop('disabled', false);
        Input += ('0' + addDecimal.value);
        flg = 2;
        decimalMode = 1;
    }
    display.html(totalInput + Input);
}

//演算子の入力
function operatorClick(addOperator){
    //数値入力後の演算子入力 
    if(flg === 0){
        totalInput += (num + addOperator.value);
        Input = '';
    }
    //演算子の連続入力（一回前に入力した演算子は削除→最後に入力演算子を追加）
    else if(flg === 1){
        totalInput = totalInput.slice(0,-1);
        totalInput += addOperator.value;
    } 
    //
    //小数点直後に演算子（小数点削除）
    else if(flg === 2){
        Input = Input.slice(0,-1);
        totalInput += (Input + addOperator.value);
        Input = '';
    }
    decimalMode = 0;
    flg = 1;
    display.html(totalInput);
}
//クリア
function clearClick(){
    flg = 1;
    decimalMode = 0;
    Input = '';
    totalInput= '';
    num = 0;
    result = 0;
    disabledElements.prop('disabled', true);
    display.html('0');
}

//計算処理
function equalClick(){
    if(flg === 0){
        totalInput += num;
    }else if(flg === 1){
        totalInput = totalInput.slice(0,-1);
    }else if(flg === 2){
        totalInput += Input;
    }
    result = eval(totalInput);
    display.html(result);

    //計算結果に対し再計算するための処理
    Input = String(result);
    num = Number(Input);
    flg = 0;
    totalInput = '';
    if(Input.includes('.')){
        decimalMode = 1;
    }else{
        decimalMode = 0;
    }
}


