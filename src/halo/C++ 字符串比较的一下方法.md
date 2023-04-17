---
icon: edit
date: 2023-01-31
category:
  - cpp
headerDepth: 5
---


# C++ 字符串比较的一下方法
字符串比较是否包含
```
 bool canConstruct(std::string ransomNote, std::string magazine)
    {   //字符串等长情况
        int magazineLength =magazine.length();
        int ransomNoteLength =ransomNote.length();
        if(magazineLength == ransomNoteLength){
            for (size_t i = 0; i < ransomNoteLength; i++)
            {
                if(magazine[i]!=ransomNote[i]){
                   return false;
                }
            }
            return true;
        }

        if (magazineLength > ransomNoteLength)
        {
            int temp= 0;
             for (size_t i = 0; i < magazineLength; i++)
            { 
                if(magazine[i]==ransomNote[temp]){
                    temp++;
                }else{
                    temp = 0;
                }
                if(temp==ransomNoteLength){
                    return true;
                }
            }
        }
        return false;
    }
```