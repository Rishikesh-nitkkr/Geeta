package com.gitamentor.repository;

import com.gitamentor.model.UserQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserQueryRepository extends JpaRepository<UserQuery, Long> {
    List<UserQuery> findByUserId(Long userId);
}
