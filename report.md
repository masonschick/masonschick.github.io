---
layout: wide_default
---  
# Report File

## Summary Section

I was hoping to create sentiment variables reflecting various topics that would be discussed in 10-K filings. Some examples of topics I wanted to focus on with my sentiment variables include Supply Chain, Inflation, and Interest Rates. 

Unfortunately, I was unable to create sentiment variables that reflected the contents of the 10-K reports. Alternatively, I used random scores that will allow for graphs of the return data. In this report I will discuss the results I expected to see and the insights I took away from working with the data I was able to manipulate successfully.

## Data Section

The sample in my data comes from the 2022 10-K of each S&P 500 company. I accessed information like CIK and Accession Number in order to merge the data frame I created with other important information like ticker symbol (from the sp500_2022.csv file saved in the inputs subfolder) and return data (from the crsp_2022_only.zip file saved in the return_data subfolder). 

### Building and Modifying Return Variables

For this report, we were meant to create 3 return variables:

- Returns on the day of the filing
- Returns from the first two days after the filing
- Returns from three days after the filing to 10 days after the filing

the crsp_2022_only.zip file contained data with the company ticker, date, and return on that date. I was able to find this with the following code:

```
zip_path = 'return_data/crsp_2022_only.zip'
dta_file_name = 'crsp_2022_only.dta'

# Use context manager to open and read the .dta file directly from the zip
with ZipFile(zip_path) as zip_file:
    with zip_file.open(dta_file_name) as dta_file:
        # Read the .dta file into a pandas DataFrame
        crsp_data = pd.read_stata(dta_file)

# Now crsp_data contains your DataFrame with the data from the .dta file
print(crsp_data.head())
```

By understanding the contents of the returns zip file, I knew I needed to access the filing dates from the SEC website, using the CIK and Accession Numbers as identifiers for each company. With the filing dates, it was possible to create consistent variables for the company returns relative to when they filed their reports.

Return data on the day of the filing was the most intuitive, as I only needed to merge my working dataframe (report_df) with the return data (crsp_data) based on the filing date and ticker. Unfortunately, I had a difficult time coding the other two return variables, so I decided to stick to the same day returns in my analysis.

## Building and Modifying Sentiment Variables

The sentiment variables were meant to be built based on the two studies utilized in this project. Between the two studies, I was able to create 4 lists of words (2 positive and 2 negative). While I was unable to create sentiment variables based on these actual dictionaries, the goal was to iterate through each S&P 500 company's 10-K, and searched for the selected positive / negative words that fit my selected focus. By finding the total count of my selected words in the 10-K filings, I would have been able to assign sentiment scores to each firm corresponding with each variable. Since, I failed to complete this component of the project, I instead created random sentiment scores to simulate what my dataframe should have looked like, and allow for a hypothetical analysis based on my predictions.

### Datapoints about the sentiment variables

Despite failing to utilize the sentiment variables, I still analyzed my 4 sentiment dictionaries:

From "The colour of finance words", I created: 
- A positive word list, BHR_positive, containing 75 words
- A negative word list, BHR_negative, containing 94 words

From "When is a Liability not a Liability? Textual Analysis, Dictionaries, and 10-Ks", I created:
- a positive word list, LM_positive, containing 345 words
- a negative word list, LM_negative, containing 2305 words

I was unable to utilize near_regex, but I still imported:
```
from near_regex import NEAR_regex
```
and copied the near_regex.py file into the assignment file to allow for its utility.

## Results



```python
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

report_df_final = pd.read_csv('output/report_df_final.csv')

avg_returns_by_symbol = report_df_final.groupby('Symbol')['ret'].mean().reset_index()

plt.figure(figsize=(10, 6))
sns.histplot(avg_returns_by_symbol['ret'], kde=True, bins=30, color='skyblue')
plt.title('Distribution of Average Returns Across Symbols')
plt.xlabel('Average Return')
plt.ylabel('Frequency')
plt.show()
```

    C:\Users\mason\anaconda3\Lib\site-packages\seaborn\_oldcore.py:1119: FutureWarning: use_inf_as_na option is deprecated and will be removed in a future version. Convert inf values to NaN before operating instead.
      with pd.option_context('mode.use_inf_as_na', True):
    


    
![png](output_4_1.png)
    


### Real Data ###

The graph depicted above does not account for any of the sentiment analysis, but instead visualizes all of the real data I was able to incorporate in my output csv file (report_df_final.csv)

Since I had the filing dates and single day return on that date for most of the companies, I showed the number of companies within bins of .05 to help visualize the volatility of the companies on that day. Unsurprisingly, most companies were relatively stable and there does not appear to be a considerable skew towards the positive or negative side. However, there are a few outliers, particularly on the negative side of the distribution.


```python
plt.figure(figsize=(10,6))
sns.regplot(x='sentiment_var_1', y='ret', data=report_df_final, scatter_kws={'alpha':0.5})
plt.title('Return vs. Sentiment Variable 1 with Regression Line')
plt.xlabel('Sentiment Variable 1')
plt.ylabel('Return')
plt.show()
```


    
![png](output_6_0.png)
    


### Randomly Generated Sentiment Variables against returns ###

I included the plots of all 10 sentiment variables in the exploration_ugly file, but I will only include the first one in the report due to redundancy and irrelevance. Since the sentiment scores were randomly generated in my case, the graphs are all relatively the same, and there are no significant / real relationships to analyze. Nonetheless, this graph provides a reasonable idea of how I planned to visualize real sentiment variables. 

Sentiment scores are on the X-axis and returns are on the Y-axis. So, if I were using a positive sentiment variable, I would have expected low sentiment scores to correspond with low returns closer to the bottom left of the graph. Alternatively, negative sentiment variables likely would have corresponded with higher returns when there was low scores, and these returns would decrease as the negative-sentiment score increased. The regression likely would have been helpful with real data, especially if the relationship was not very noticeable in the scatterplot alone.

### Discusion Topics

**Comparing and Contrasting the Relationship between the LM Sentiment results and ML Sentiment results**

As I've already discussed, I did not have real sentiment variables based on the dictionaries from these studies, but I will still discuss the results I expected. The LM Sentiment variables were based on a dictionary with a more comprehensive list than the ML Sentiment variables. Even if I used sentiment variables with the same number of words from each dictionary, I would have had a larger list to chose from in the LM Sentiment dictionary, leading me to select more fitting words. I believe this would have caused a greater number of matches for LM Sentiment variables. If this were the case, the magnitudes of the relationships would have been greater for LM variables than for ML variables. It would have also made it more likely for the signs of the relationships to correspond with my expectations a greater amount of the time.

**Why did they bother to include so many more firms and years and additional controls in their study?**

While I don't have results that can correlate or refute with the results of Garcia, Hu and Rohrer's study, I still believe I gained insights as to why they included so many more firms, years, and additional controls. Even if I did every step of this project correctly, it would have been difficult to make much sense of the results. Determining the effect of 10-K filings' sentiment on short term equity volatility is an extremely difficult process. Even though I found this project to be extremely difficult, it is not the most robust way to analyze short term volotility among the biggest companies in the world. As I spent more time working through the data, I learned this project is an oversimplification of more comprehensive processes like Garcia, Hu and Rohrer's study. If there were exact and reliable relationships between 10-K sentiment variables and short term market reactions, financial institutions would exploit that theoretical arbitrage until there is no longer a relationship to benefit from. So, it makes sense for their study to be more comprehensive. If enough factors are taken into account, it might be possible to find relationships between certain sentiment variables and near term returns. However, in free markets, easily identifiable short term market reactions like the ones we searched for would be taken into account by countless financial institutions, and this would counteract the volatile reaction entirely. So it takes increasingly complex analysis to find relationships that most investors cannot. Even though I theoretically could have had results that aligned with Garcia, Hu and Rohrer's study, it makes sense to include more firms, years, and controls in their study in an effort to find more reliable relationships that other investors don't anticipate.

**Discussing my 3 contextual sentiment measures**

I am unable to discuss these measures due to my failure to create them.

**Speculating whether there is difference in the sign and magnitude**

While I don't have the actual variables to look for a difference in the sign and magnitude, I can still consider reasons for differences. Like I've already mentioned. I would expect the negative sentiment variables to have a negative correlation as those scores increase, and I would expect the positive sentiment variables to have a positive correlation as scores increase. However, without real data it is more interesting to consider differences in magnitude. This would mean that the results of one variable impacted the returns greater than another variable. For example, if I created one of my sentiment variables with words that are associated with supply chains and another sentiment variable associated with interest rates, it would be interesting to analyze why one of those variables has greater magnitude in the results. Taking this example further, if the hypothetical interest rate variable had greater magnitude than the supply chain variable, this would indicate that investors reacted stronger to information within the 10-K related to the interest rate conditions. But, it could also indicate many other things. For example, maybe the 10-K report talked about interest rate conditions more than it talked about supply chain. Or, the words selected to be associated with interest rates could have fit better than the words selected for supply chains. It is interesting to consider the various reasons for differences in the sign and magnitude, but it is ultimately impossible to make a more tangible analysis without successfully creating the data originally.



