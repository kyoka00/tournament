'use strict';

const Bracket = window['vue-tournament-bracket'];

// const rounds = [
//     {games: [
//         {   
//             match_id: 1,
//             player1: {},
//             player2: {},
//         },
//         {
//             match_id: 2,
//             player1: {},
//             player2: {},
//         },
//         {   
//             match_id: 3,
//             player1: {},
//             player2: {},
//         },
//         {   
//             match_id: 4,
//             player1: {},
//             player2: {},
//         }
//     ]},
// {games: [
//         {
//             match_id: 9,
//             player1: {},
//             player2: {},
//         },
//         {
//             match_id: 10,
//             player1: {},
//             player2: {},
//         }
//     ]},
// {games: [
//         {
//             match_id: 13,
//             player1: {},
//             player2: {},
//         }
//     ]}
// ]

const vue = new Vue({
    el: "#app",
    components: {
        bracket: Bracket
    },
    data: {
        tournaments: [],
        team_lists: [
            {
                team_id: 1,
                player1_name: 'A',
                player2_name: 'B',
                tournament_no: 1
            },
            {
                team_id: 2,
                player1_name: 'C',
                player2_name: 'D',
                tournament_no: 1
            },
            {
                team_id: 3,
                player1_name: 'E',
                player2_name: 'F',
                tournament_no: 1
            },
            {
                team_id: 4,
                player1_name: 'G',
                player2_name: 'H',
                tournament_no: 1
            },
            {
                team_id: 5,
                player1_name: 'I',
                player2_name: 'J',
                tournament_no: 1
            },
            {
                team_id: 6,
                player1_name: 'K',
                player2_name: 'L',
                tournament_no: 1
            },
            {
                team_id: 7,
                player1_name: 'M',
                player2_name: 'N',
                tournament_no: 1
            },
            {
                team_id: 8,
                player1_name: 'O',
                player2_name: 'P',
                tournament_no: 1
            },
            {
                team_id: 9,
                player1_name: 'Q',
                player2_name: 'R',
                tournament_no: 1
            },
            {
                team_id: 10,
                player1_name: 'S',
                player2_name: 'T',
                tournament_no: 1
            },
            {
                team_id: 11,
                player1_name: 'U',
                player2_name: 'V',
                tournament_no: 1
            },
            {
                team_id: 12,
                player1_name: 'W',
                player2_name: 'X',
                tournament_no: 1
            },
            {
                team_id: 14,
                player1_name: 'Y',
                player2_name: 'Z',
                tournament_no: 1
            },
            {
                team_id: 15,
                player1_name: 'AA',
                player2_name: 'AB',
                tournament_no: 1
            },
            {
                team_id: 16,
                player1_name: 'AC',
                player2_name: 'AD',
                tournament_no: 1
            },
            {
                team_id: 17,
                player1_name: 'AE',
                player2_name: 'AF',
                tournament_no: 1
            },
            {
                team_id: 18,
                player1_name: 'AG',
                player2_name: 'AH',
                tournament_no: 1
            },
            {
                team_id: 19,
                player1_name: 'AI',
                player2_name: 'AJ',
                tournament_no: 1
            },
            {
                team_id: 20,
                player1_name: 'AK',
                player2_name: 'AL',
                tournament_no: 1
            },
            {
                team_id: 21,
                player1_name: 'BA',
                player2_name: 'BB',
                tournament_no: 2
            },
            {
                team_id: 22,
                player1_name: 'BC',
                player2_name: 'BD',
                tournament_no: 2
            },
            {
                team_id: 23,
                player1_name: 'BE',
                player2_name: 'BF',
                tournament_no: 2
            },
            {
                team_id: 24,
                player1_name: 'BG',
                player2_name: 'BH',
                tournament_no: 2
            },
        ],
        match_num: 0,
        drag_team_id: null,
        drag_match_id: null,
    },
    methods:{
        create_tournament(tournament_no, team_lists) {
            let team_num = team_lists.length;
            this.tournaments.push(
                {
                    tournament_no: tournament_no,
                    rounds: [],
                }
            );
            this.create_rounds(team_num);
        },
        create_rounds(team_num) {
            team_num = Math.ceil(team_num / 2);
            this.tournaments[this.tournaments.length - 1].rounds.push(
                {
                    games: []
                }
            );
            for(let i = 0; i < team_num; i++) {
                this.match_num++;
                this.tournaments[this.tournaments.length - 1].rounds[this.tournaments[this.tournaments.length -1].rounds.length - 1].games.push(
                    {
                        match_id: this.match_num,
                        player1: {},
                        player2: {},
                    }
                );
            }
            if(team_num > 1) {
                this.create_rounds(team_num);
            }
        },
        allot_team(tournament_no, team_lists) {
            this.tournaments[tournament_no - 1].rounds[0].games.find(obj => {
                // そのトーナメントの1回戦の試合番号を1にするための変数
                let current_match_id = this.tournaments[tournament_no - 1].rounds[0].games[0].match_id - 1;
                // トーナメントごとの試合番号
                let match_id_every_tournament = obj.match_id - current_match_id;
                // 試合番号から、適当に2チームを選ぶ
                let team_1 = team_lists[(match_id_every_tournament * 2) - 2];
                let team_2 = team_lists[(match_id_every_tournament * 2) - 1];
                let team_empty = team_lists[0];
                // 試合にチームを挿入
                obj.player1 = {
                    id: team_1.team_id,
                    name: '・' + team_1.player1_name + team_1.player2_name,
                };
                if(team_lists.length >= match_id_every_tournament * 2) {
                    obj.player2 = {
                        id: team_2.team_id,
                        name: '・' + team_2.player1_name + team_2.player2_name,
                    };
                } else {
                    obj.player2 = {
                        id: team_empty.team_id,
                        name: '・' + team_empty.player1_name + team_empty.player2_name,
                    };
                }
            })
        },
        view_result_or_play_start(match_id) {
            // 条件式：　試合番号で受信ボックスTBLに検索を掛けても、登録済みのレコードが無い && 選手が一人しかいない試合（シード）ではない
            if(match_id) {
                // 試合設定画面に遷移
            } else {
                // モーダル表示
            }
        },
        dragList(event, drag_team_id) {
            this.drag_team_id = drag_team_id;
            this.drag_match_id = event.target.parentNode.parentNode.parentNode.parentNode.children[1].value;
        },
        dropList(event, drop_team_id) {
            const drop_match_id = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.children[1].value;

            // ドラッグ情報の取得・生成
            let drag_team = null;
            if(this.drag_team_id >= 0) {
                drag_team = this.team_lists.find(team => team.team_id === this.drag_team_id);
            } else {
                drag_team = {
                    team_id: this.drag_team_id,
                    player1_name: 'empty',
                    player2_name: '',
                    tournament_no: this.drag_team_id * -1
                };
            }
            const drag_match = this.tournaments[drag_team.tournament_no - 1].rounds[0].games.find(match => match.match_id == this.drag_match_id);

            // ドロップ情報の取得・生成
            let drop_team = null;
            if(drop_team_id >= 0) {
                drop_team = this.team_lists.find(team => team.team_id === drop_team_id);
            } else {
                drop_team = {
                    team_id: drop_team_id,
                    player1_name: 'empty',
                    player2_name: '',
                    tournament_no: drop_team_id * -1
                };
            }
            const drop_match = this.tournaments[drop_team.tournament_no - 1].rounds[0].games.find(match => match.match_id == drop_match_id);

            let changed_player;
            if(drag_team.tournament_no === drop_team.tournament_no) {
                if(drag_team.team_id === drag_match.player1.id) {
                    drag_match.player1 = {
                        id: drop_team.team_id,
                        name: "・" + drop_team.player1_name + drop_team.player2_name,
                    };
                    changed_player = 1;
                } else if(drag_team.team_id === drag_match.player2.id) {
                    drag_match.player2 = {
                        id: drop_team.team_id,
                        name: "・" + drop_team.player1_name + drop_team.player2_name,
                    };
                    changed_player = 2;
                }
                if(drag_match.match_id === drop_match.match_id) {
                    switch(changed_player) {
                        case 1:
                            drop_match.player2 = {
                                id: drag_team.team_id,
                                name: "・" + drag_team.player1_name + drag_team.player2_name,
                            };
                            break;
                        case 2:
                            drop_match.player1 = {
                                id: drag_team.team_id,
                                name: "・" + drag_team.player1_name + drag_team.player2_name,
                            };
                            break;
                    }
                } else {
                    if(drop_team.team_id === drop_match.player1.id) {
                        drop_match.player1 = {
                            id: drag_team.team_id,
                            name: "・" + drag_team.player1_name + drag_team.player2_name,
                        };
                    } else if(drop_team.team_id === drop_match.player2.id) {
                        drop_match.player2 = {
                            id: drag_team.team_id,
                            name: "・" + drag_team.player1_name + drag_team.player2_name,
                        };
                    }
                }
            }
        },
    },
    created: function() {
        // fetch('/getPlayerList')
        // .then(res => res.json().then(data => this.team_lists = data))
        // .catch(error => console.log(error));
        this.create_tournament(1, this.team_lists_1);
        this.allot_team(1, this.team_lists_1);
        console.log(this.team_lists_2);
        this.create_tournament(2, this.team_lists_2);
        this.allot_team(2, this.team_lists_2);
        console.log(this.tournaments);
    },
    computed: {
        team_lists_1 () {
            let lists = this.team_lists.filter(team => team.tournament_no === 1)
            if(lists.length % 2 === 1) {
                lists.push(
                    {
                        team_id: -1,
                        player1_name: 'empty',
                        player2_name: '',
                        tournament_no: 1
                    }
                );
            }
            return lists;
        },
        team_lists_2 () {
            let lists = this.team_lists.filter(team => team.tournament_no === 2);
            if(lists.length % 2 === 1) {
                lists.push(
                    {
                        team_id: -2,
                        player1_name: 'empty',
                        player2_name: '',
                        tournament_no: 2
                    }
                );
            }
            return lists;
        },
    },
})