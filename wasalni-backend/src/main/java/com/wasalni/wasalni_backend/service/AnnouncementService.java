package com.wasalni.wasalni_backend.service;

import com.wasalni.wasalni_backend.model.Announcement;
import com.wasalni.wasalni_backend.repo.AnnouncementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnouncementService {

    @Autowired
    private AnnouncementRepo announcementRepo;

    public Announcement saveAnnouncement(Announcement announcement) {
        return announcementRepo.save(announcement);
    }

    public List<Announcement> getAllAnnouncements() {
        return announcementRepo.findAll();
    }
}
