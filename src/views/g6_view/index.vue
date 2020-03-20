<template>
    <div class="main-container">
        <el-button class="go_back" type="primary" size="mini" @click="back">返回</el-button>
        <div id="mountNode"></div>
    </div>
</template>

<script>
    const data = {
        // 点集
        nodes: [
            {
                id: 'node1', // String，该节点存在则必须，节点的唯一标识
                x: 100, // Number，可选，节点位置的 x 值
                y: 200, // Number，可选，节点位置的 y 值
                label: '起始点'//节点文本
            },
            {
                id: 'node2', // String，该节点存在则必须，节点的唯一标识
                x: 300, // Number，可选，节点位置的 x 值
                y: 200, // Number，可选，节点位置的 y 值
                label: '目标点'//节点文本
            },
        ],
        // 边集
        edges: [
            {
                source: 'node1', // String，必须，起始点 id
                target: 'node2', // String，必须，目标点 id
                label: '我是连线',//边的文本
            },
        ],
    };
    export default {
        name: "g6-view",
        data(){
            return {
                graph: null,
            }
        },
        methods:{
            back(){
                this.$router.history.go(-1);
            },
            async main_graph(){
                const response = await fetch('https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json');
                const remoteData = await response.json();
                const nodes = remoteData.nodes;
                const edges = remoteData.edges;
                nodes.forEach(node => {
                    if (!node.style) {
                        node.style = {};
                    }
                    node.style.lineWidth = 1;
                    node.style.stroke = '#666';
                    node.style.fill = 'steelblue';
                    switch (node.class) {
                        case 'c0': {
                            node.shape = 'circle';
                            break;
                        }
                        case 'c1': {
                            node.shape = 'rect';
                            node.size = [ 35, 20 ];
                            break;
                        }
                        case 'c2': {
                            node.shape = 'ellipse';
                            node.size = [ 35, 20 ];
                            break;
                        }
                    }
                });
                edges.forEach(edge => {
                    if (!edge.style) {
                        edge.style = {};
                    }
                    edge.style.lineWidth = edge.weight;
                    edge.style.opacity = 0.6;
                    edge.style.stroke = 'grey';
                });
                // ...
                this.graph.data(remoteData); // 加载远程数据
                this.graph.render();         // 渲染
            }
        },
        mounted() {
            this.graph = new this.$G6.Graph({
                container: 'mountNode',
                width: 800,
                height: 600,
                fitView: true,
                fitViewPadding: [ 20, 40, 50, 20 ],
                defaultNode: {
                    size: 30,
                    labelCfg: {
                        style: {
                            fill: '#fff'
                        }
                    }
                },
                defaultEdge: {
                    labelCfg: {
                        autoRotate: true
                    }
                },
            });
            this.main_graph();
        }
    }
</script>

<style scoped lang="scss">
    .main-container{
        height: 100%;width: 100%;
        background-color: whitesmoke;
    }
    .go_back{
        position: fixed;
        top: 1em;
        left: 2em;
    }
    #mountNode{
        background-color: #2c3e50;
    }
</style>