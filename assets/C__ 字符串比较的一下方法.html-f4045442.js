import{_ as n,W as e,X as i,a2 as s}from"./framework-3a0c4e99.js";const a={},l=s(`<h1 id="c-字符串比较的一下方法" tabindex="-1"><a class="header-anchor" href="#c-字符串比较的一下方法" aria-hidden="true">#</a> C++ 字符串比较的一下方法</h1><p>字符串比较是否包含</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> bool canConstruct(std::string ransomNote, std::string magazine)
    {   //字符串等长情况
        int magazineLength =magazine.length();
        int ransomNoteLength =ransomNote.length();
        if(magazineLength == ransomNoteLength){
            for (size_t i = 0; i &lt; ransomNoteLength; i++)
            {
                if(magazine[i]!=ransomNote[i]){
                   return false;
                }
            }
            return true;
        }

        if (magazineLength &gt; ransomNoteLength)
        {
            int temp= 0;
             for (size_t i = 0; i &lt; magazineLength; i++)
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),d=[l];function r(t,v){return e(),i("div",null,d)}const c=n(a,[["render",r],["__file","C__ 字符串比较的一下方法.html.vue"]]);export{c as default};
