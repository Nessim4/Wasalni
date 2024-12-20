package com.wasalni.wasalni_backend.repo;

import com.wasalni.wasalni_backend.model.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepo extends JpaRepository<Announcement, Long> {
}