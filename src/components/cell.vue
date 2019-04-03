<template>
    <div>
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    123
                </div>
                <div class="weui-cell__bd">
                    bd
                </div>
                <div class="weui-cell__ft">ft</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
.weui-cells{
    margin-top: 5px;
  &::before{
      content: '';
      border-top: 1px solid #f3f3f3;
  }
  &:after{
      content:"";
      border-bottom: 1px solid #999;
      
  }

    .weui-cell{
        display: flex;
        flex-direction: row;
        .weui-cell__hd{

        }
        .weui-cell__bd{
            flex: 1;
        }
        .weui-cell__ft{
            float: right;
            font-size: 12px;
            color:#999;
        }
    }
}

</style>
