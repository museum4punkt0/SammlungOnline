package com.xailabs.microservices.hasura.auth.handler;

import com.xailabs.microservices.hasura.auth.data.User;
import com.xailabs.microservices.hasura.auth.graphql.queries.fragment.UserData;
import com.xailabs.microservices.hasura.auth.graphql.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.security.auth.login.AccountNotFoundException;
import javax.security.auth.login.LoginException;

@Component
public class TokenLogin {

    private final UserRepository repo;

    @Autowired
    public TokenLogin(final UserRepository repo) {
        this.repo = repo;
    }

    @Login
    public User login(final String token) throws LoginException {
        UserData user = repo.fetchUserByTokenSync(token);
        if (user == null) {
            throw new AccountNotFoundException("invalid token " + token);
        }
        return toUser(user);
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
