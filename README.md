# Tickr
Our project for Hack the 6ix 2022! Tickr is our take on "tinder for stocks" where users are presented a list of suggested stocks and their metrics and swipe right on the ones they like

## Inspiration
After being overwhelmed by the volume of financial educational tools available, we discovered how the majority of products are focused for institutions or expensive. We decided there needs to be an easy approach to learning about stocks in a more casual environment. Interested in the simplicity of Tinder’s yes or no swiping mechanics, we decided to combine the 2 ideas to create Tickr!

## What it does
Tickr is a stock screening tool designed to help beginner retail investors discover their next trade! Using an intuitive yes or no discovery system through swiping mechanics, Tickr the next Tinder for stocks. For a more in depth video demo, see our [original screen recorded demo video!](https://youtu.be/dU6rF8vymKE)

## How we built it
Our team created this web app using a Node and Express back end paired with a React front end. The back end of our project used 3 linked Supabase tables to host authenticated user information, static information about stocks from the New York stock exchange and NASDAQ. We also used the [Finnhub API](https://finnhub.io/) to get real time metrics about the stocks we were showing our users.

## Challenges we ran into
Our biggest challenge was setting the scope into something that our team could complete in a weekend. We hadn't used Node and Express in a long time, so getting comfortable with our stack again took more time than we thought. 

We were also completely new to Supabase and decided to try it out because it sounded really interesting. While Supabase turned out to be incredibly useful and userfriendly, the learning curve for it also took a bit more time than we thought.

## Accomplishments that we're proud of
The two accomplishments we are most proud of are our finished UI and successful integration of the Finnhub API. Drawing inspiration from Tinder, we were able to recreate a similar UI/UX design with minimal help from pre-existing libraries. Further, we were able to design our backend to make seamless API calls to fetch relevant data for our application.

## What we learned
During this project we learned a lot about the power of friendship and anime. Some of us learned what a market cap was and how to write a viable business proposal while others learned more about full stack development and how to host a database on Supabase. 

Overall it was a very fun project and we're really glad we were able to get our MVP done 😁✌️

## What's next for Tickr
Our next goal for Tickr is to finish off the aggregate news feed function. This would entail a news feed of all stocks swiped on and provide notification. This would help improve our north star metric of time spent on platform and daily active users!
