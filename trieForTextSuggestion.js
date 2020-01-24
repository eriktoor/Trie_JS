class Node {
    constructor(character) {
        this.character = character; 
        this.weight = 1; 
        this.children = []; //new Set();
        this.isWord = false;
    }
}

class Trie{
    constructor(words){
        this.root = new Node("")
        this.buildTrie(words)
    }

    letterInChildren(letter, node){
        if (node.children.length == 0 ){
            return -1 
        }

        for (var child in node.children){
            if (node.children[child].character == letter || node.children[child].character == letter.toUpperCase()) { 
                //console.log(node.children[child])
                return node.children[child]
            }
        }
        return -1
    }

    dfs(currNode, res, word){

        if (currNode.children.length == 0 || currNode.isWord == true){
            res.push(word)
        }

        for (var child in currNode.children){
            this.dfs(currNode.children[child], res, word + currNode.children[child].character)
            console.log(word)
        }

    }


    nodeInfo(word){
        if (word.length == 0) {
            return "Search for a result..."
        }

        var currNode = this.root

        var prefix = ""

        for (var letter in word){
            prefix += word[letter]
            // get the next node for each letter or return no suggestions need another for 
            var nextNode = this.letterInChildren(word[letter], currNode)
            //console.log(prefix, nextNode, word[letter], currNode.character)
            if (nextNode != -1) {
                console.log(prefix)
                
            } else {
                return "No results found"
            }

            currNode = nextNode
        }

        return currNode

    }




    suggest(word){
        if (word.length == 0) {
            return "Search for a result..."
        }

        var currNode = this.root

        var prefix = ""

        for (var letter in word){
            prefix += word[letter]
            // get the next node for each letter or return no suggestions need another for 
            var nextNode = this.letterInChildren(word[letter], currNode)
            //console.log(prefix, nextNode, word[letter], currNode.character)
            if (nextNode != -1) {
                console.log(prefix)
                
            } else {
                return "No results found"
            }

            currNode = nextNode
        }

        var res = []

        this.dfs(nextNode, res, prefix)

        return res 



    }


    prettyPrintTrie(){
        let levelOrder = this.levelOrderTraversal()
        
        let out = ""; 

        for (var level in levelOrder){
            let id = "level" + level
            out += "<center><p id=" + id + ">"
            for (var element in levelOrder[level]){
                if (id === 0){out += "root" } else {
                out += levelOrder[level][element] + "  " 
                }
            }
            out += "</p></center><br>"

        }
     
        return out
    }


    prettyPrintTree(){
        let levelOrder = this.printTree(this.root)
        
        let out = ""; 

        for (var level in levelOrder){
            var id = "level" + level
            out += "<center><p id=" + id + ">"
            for (var element in levelOrder[level]){
                if (id == "level0"){
                    out += "<p style='margin-right:1%; display: inline-block;color: red; font-weight:bold'>^</p>" 
                    break
                } else {

                out += "<p style='margin-right:1.5%; display: inline-block; color:red; font-weight: bold;'>"  + levelOrder[level][element] + "</p>" 
                }
            }
            out += "</p></center><br>"

        }
     
        return out
    }

    printTree (root) {
        function dfs(matrix, left, right, i, root) {
            if (!root) {
              return matrix;
            }
            const j = (left + right) / 2;
            matrix[i][j] = root.character + '';
            dfs(matrix, left, j - 1, i + 1, root.children[0]);
            dfs(matrix, j + 1, right, i + 1, root.children[1]);
            return matrix;
          }
          
          function getDimentions(root, depth = 0) {
            if (!root) {
              return [depth, 0];
            }
            const left = getDimentions(root.children[0], depth + 1);
            const right = getDimentions(root.children[1], depth + 1);
            // prettier-ignore
            return [
              Math.max(left[0], right[0]),
              2 * Math.max(left[1], right[1]) + 1,
            ];
          }





        const [m, n] = getDimentions(root);
        const matrix = new Array(m).fill(null).map(() => new Array(n).fill(''));
        return dfs(matrix, 0, n - 1, 0, root);
    
    };
      

      



    levelOrderTraversal(){

        var res = [] 

        var q = [] 

        q.push(this.root)

        while (q.length != 0){ 
            let currLevel = []
            let len = q.length
            //console.log(len)
            for (var i in q){
                let curr = q.shift()
                currLevel.push(curr.character)
                //cconsole.log(curr)
                for (var j in curr.children){
                    q.push(curr.children[j])
                }
            
            }
            res.push(currLevel)

        }


    return res
    }


    getHeight(root, height, heights){
        if (root.children.length == 0){
            heights.push(height)
        }
        for (var letter in root.children){
            this.getHeight(root.children[letter], height + 1, heights)
        }

        let max = heights[0]
        for (let num in heights){
            max = Math.max(heights[num], max)
        }
        return max 

    }
    

    buildTrie(words){ //still need to allow multiple words to be appended to the same path 
        var currNode = this.root

        for (var word in words){
            currNode = this.root
            var currWord = words[word]
            for (var letter in currWord){
                var nextNode = this.letterInChildren(currWord[letter], currNode) 
                if (nextNode != -1){
                    nextNode.weight += 1 
                } else {
                    nextNode = new Node(currWord[letter])
                    currNode.children.push(nextNode)
                }
                if (letter == currWord.length - 1){
                    nextNode.isWord = true
                }
                currNode = nextNode
            }

        }
    }

}





word = "Alabama, Alaska, American Samoa, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, District of Columbia, Florida, Georgia, Guam, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Minor Outlying Islands, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Northern Mariana Islands, Ohio, Oklahoma, Oregon, Pennsylvania, Puerto Rico, Rhode Island, South Carolina, South Dakota, Tennessee, Texas, U.S. Virgin Islands, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, Wyoming"
states = word.split(", ")
trie = new Trie(states)

sample = ["Erik", "Eve", "Adam", "Amy"]
trie_sample = new Trie(sample)
console.log(trie_sample.prettyPrintTree())