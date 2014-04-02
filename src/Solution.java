import java.io.*;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
public class Solution {
    public static void main(String args[] ) throws Exception {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT */
    	
    	BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int n = Integer.parseInt(line);
        
        int[] result = new int[n * n];
        int[][] table = new int[n][n];
    	
        int lineNum = 0;
        while ((line = br.readLine()) != null) {
        	String[] arr = line.split(" ");
        	for(int i = 0; i < n; i ++){
            	table[lineNum][i] = Integer.parseInt(arr[i]);
        	}
        	lineNum++;
        }
        
        
        /*Data is ready, iterate through each element
          Check its 8 neiboughs. Get the most-direct father.
          Put the child-parent relation into the result array*/
        
        int index = 0;
        for(int i = 0; i < n; i ++){ //row
        	for(int j = 0; j < n; j++){ //col
        		int indexRow = 0;
        		int indexCol = 0;
        		int min = Integer.MAX_VALUE;
        		//up
        		if(i-1 >= 0 && table[i-1][j] < min && table[i-1][j] < table[i][j]){
        			min = table[i-1][j];
        			indexRow = i-1;
        			indexCol = j;
        		}
        		//down
        		if(i+1 <= n-1 && table[i+1][j] < min && table[i+1][j] < table[i][j]){
        			min = table[i+1][j];
        			indexRow = i+1;
        			indexCol = j;
        		}
        		//left
        		if(j-1 >= 0 && table[i][j-1] < min && table[i][j-1] < table[i][j]){
        			min = table[i][j-1];
        			indexRow = i;
        			indexCol = j-1;
        		}
        		//right
        		if(j+1 <= n-1 && table[i][j+1] < min && table[i][j+1] < table[i][j]){
        			min = table[i][j+1];
        			indexRow = i;
        			indexCol = j+1;
        		}
        		//up-left
        		if(i-1 >= 0 && j-1 >=0 && table[i-1][j-1] < min && table[i-1][j-1] < table[i][j]){
        			min = table[i-1][j-1];
        			indexRow = i-1;
        			indexCol = j-1;
        		}
        		//up-right
        		if(i-1 >= 0 && j+1 <= n-1 && table[i-1][j+1] < min && table[i-1][j+1] < table[i][j]){
        			min = table[i-1][j+1];
        			indexRow = i-1;
        			indexCol = j+1;
        		}
        		//down-left
        		if(i+1 <= n-1 && j-1 >= 0 && table[i+1][j-1] < min && table[i+1][j-1] < table[i][j]){
        			min = table[i+1][j-1];
        			indexRow = i+1;
        			indexCol = j-1;
        		}
        		//down-right
        		if(i+1 <= n-1 && j+1 <= n-1 && table[i+1][j+1] < min && table[i+1][j+1] < table[i][j]){
        			min = table[i+1][j+1];
        			indexRow = i+1;
        			indexCol = j+1;
        		}
        		
        		//if it is local minimun, make the index its itself index
        		if(min == Integer.MAX_VALUE){
        			result[index] = i * n + j;
        		}else{
        			result[index] = indexRow * n + indexCol;
        		}
        		index ++;
        	}
        }

        
        /*Ues the idea of union-find method, update the child-parent relation recursively*/
        for(int i = 0; i < n * n; i ++){
        	if(result[i] == i) continue;
        	result[i] = getFather(result, result[i]);
        }
        
        /*Count the final result using a hashmap*/
        HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
        for(int i = 0; i < n* n; i++){
        	if(map.get(result[i]) == null){
        		map.put(result[i], 1);
        	}else{
        		map.put(result[i], map.get(result[i]) + 1);
        	}
        }
        
        /*Sort the keys*/
        int[] keys = new int[map.size()];
        int ind = 0;
        for(int a : map.keySet()){
        	keys[ind] = map.get(a);
        	ind ++;
        }
        
        Arrays.sort(keys);
        
        /*Output*/
        for(int i = keys.length - 1; i >= 0; i--){
        	System.out.print(keys[i] + " ");
        }
    }
    
    /**Recursion to get the father of the current node*/
    public static int getFather(int[] result, int i){
    	if(result[i] == i){
    		return i;
    	}
    	
    	result[i] = getFather(result, result[i]);
    	return result[i];
    }
}