import List from '@mui/material/List';
import CardFriends from '../card-friends/card-friends.component'

export default function CardsFriends() {

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
    <List sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
        {
        friends?.map((friend) => (
          <CardFriends key={friend.name} friend={friend} ></CardFriends>
        ))}
    </List>
  );
}