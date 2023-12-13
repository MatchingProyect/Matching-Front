import CardFriends from "../card-friends/card-friends.component";

function CardsFriends() {
  const friends = [
    {
        name: "John",
        games: 10
    },
    {
        name: "Adam",
        games: 8
    },
    {
        name: "Peter",
        games: 3
    },
    {
        name: "Diego",
        games: 3
    },
    {
        name: "Daniel",
        games: 0
    }

  ]

  return (
    <div>
      <div  className='card-list'>
        {
        friends?.map((friend) => (
          <CardFriends key={friend.name} friend={friend} ></CardFriends>
        ))}
      </div>

    </div>
    
  );
}

export default CardsFriends;
