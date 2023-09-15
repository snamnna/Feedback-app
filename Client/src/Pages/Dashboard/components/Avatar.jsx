import PropTypes from "prop-types";

export const Avatar = ({ user }) => {
  return (
    <div className="avatar placeholder">
      <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
        <span className="text-2xl">{user?.username[0]}</span>
      </div>
    </div>
  );
};

Avatar.defaultProps = {
  user: {
    username: "User",
  },
};

Avatar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
};
