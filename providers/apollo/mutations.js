import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  mutation signin($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      user {
        _id
        username
        photo
        email
      }
      token
    }
  }
`;
export const USER_SIGNUP = gql`
  mutation signup($username: String!, $password: String!, $email: String!) {
    signup(user: { username: $username, password: $password, email: $email }) {
      user {
        _id
        username
        photo
        email
      }
      token
    }
  }
`;
export const USER_UPDATE = gql`
  mutation UpdateUserMutation(
    $username: String
    $photo: String
    $email: String
    $password: String
  ) {
    updateUser(
      user: {
        username: $username
        photo: $photo
        email: $email
        password: $password
      }
    ) {
      username
      photo
      email
    }
  }
`;
export const CREATE_DEBATE = gql`
  mutation CreateDebateMutation(
    $title: String!
    $photo: String!
    $argue: String!
    $tags: [String]
    $club: String
  ) {
    createDebate(
      debate: {
        title: $title
        photo: $photo
        argue: $argue
        tags: $tags
        club: $club
      }
    ) {
      _id
      title
      photo
      createdAt
      argueCount
      participants
      argueVotes
      slug
      tags {
        title
      }
    }
  }
`;
export const ADD_ROOM_VOTE = gql`
  mutation addRoomVote($slug: String!, $side: String!) {
    addRoomVote(slug: $slug, side: $side) {
      slug
      vote {
        user
        side
      }
    }
  }
`;
export const UPDATE_ROOM_STATUS = gql`
  mutation roomStatus($slug: String) {
    roomStatus(slug: $slug) {
      _id
      title
      user
      slug
    }
  }
`;
export const CREATE_ARGUE = gql`
  mutation CreateArgueMutation($argue: ArgueCreateInput!) {
    createArgue(argue: $argue) {
      _id
      argueType
      content
      parent
      createdAt
      votes {
        number
        amount
      }
    }
  }
`;
export const VOTE_ARGUE = gql`
  mutation VoteMutation($argue: String, $value: Int) {
    vote(argue: $argue, value: $value) {
      _id
      argueType
      content
      createdAt
      parent
      votes {
        number
        amount
      }
    }
  }
`;
export const FOLLOW_DEBATE = gql`
  mutation FollowMutation($followDebate: String!) {
    follow(debate: $followDebate) {
      _id
    }
  }
`;
export const UNFOLLOW_DEBATE = gql`
  mutation FollowMutation($followDebate: String!) {
    unfollow(debate: $followDebate) {
      _id
    }
  }
`;
export const CREATE_ROOM = gql`
  mutation Mutation($debate: String, $title: String) {
    createRoom(room: { debate: $debate, title: $title }) {
      _id
      title
      slug
      user
    }
  }
`;
export const JOIN_CLUB = gql`
  mutation joinClub($club: String) {
    joinClub(club: $club) {
      _id
      name
      photo
      slug
    }
  }
`;

export const USE_INVITE_LINK = gql`
  mutation Mutation($useInviteLinkInviteLink: String) {
    useInviteLink(inviteLink: $useInviteLinkInviteLink) {
      slug
    }
  }
`;

export const CREATE_CLUB = gql`
  mutation createClub($name: String, $photo: String, $inviteType: String) {
    createClub(name: $name, photo: $photo, inviteType: $inviteType) {
      _id
      name
      photo
      slug
    }
  }
`;

export const ROOMS_STATUE = gql`
  mutation roomStatus($slug: String, $status: String) {
    roomStatus(slug: $slug, status: $status) {
      live
    }
  }
`;

export const CLEAR_NOTIFICATION = gql`
  mutation clearNotifications {
    clearNotifications {
      notifications {
        text
        debate {
          title
          photo
          slug
        }
        seen
        argue
      }
    }
  }
`;
