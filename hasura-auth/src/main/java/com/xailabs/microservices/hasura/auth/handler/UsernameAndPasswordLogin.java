package com.xailabs.microservices.hasura.auth.handler;

import com.xailabs.microservices.hasura.auth.data.User;
import com.xailabs.microservices.hasura.auth.graphql.queries.fragment.UserData;
import com.xailabs.microservices.hasura.auth.graphql.repo.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.security.auth.login.AccountNotFoundException;
import javax.security.auth.login.FailedLoginException;
import javax.security.auth.login.LoginException;

@Component
public class UsernameAndPasswordLogin {

    public static final String INVALID_LOGIN_MESSAGE = "invalid username or password";

    private final UserRepository repo;

    @Autowired
    public UsernameAndPasswordLogin(final UserRepository repo) {
        this.repo = repo;
    }

    /**
     * Tries a login. Throws different exceptions for different reasons if login fails.
     * However the message text is the same so that an actual user doesn't see the difference.
     *
     * @param username username
     * @param password password
     * @return user
     * @throws LoginException if login fails
     */
    @Login
    public User login(final String username, final String password) throws LoginException {
        UserData user = repo.fetchUserByUsernameSync(username);
        if (user == null) {
            throw new AccountNotFoundException(INVALID_LOGIN_MESSAGE);
        }
        if (BCrypt.checkpw(password, user.getPassword())) {
            return toUser(user);
        }
        throw new FailedLoginException(INVALID_LOGIN_MESSAGE);
    }

    private User toUser(final UserData fields) {
        User user = new User(fields.getId());
        user.setRole(fields.getRole() == null ? null : fields.getRole().getName());
        user.setUsername(fields.getUsername());
        user.setRoleScope(fields.getEditorScope());
        user.setOwner(false);
        return user;
    }
}
