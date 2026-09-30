import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { AdminDashboard } from './AdminDashboard';
import { AdminNews } from './AdminNews';
import { AdminLeadership } from './AdminLeadership';
import { AdminEvents } from './AdminEvents';
import { AdminMedia } from './AdminMedia';
import { AdminDocuments } from './AdminDocuments';
import { AdminPrograms } from './AdminPrograms';
import { AdminFAQ } from './AdminFAQ';
import { AdminMessages } from './AdminMessages';
import { AdminSettings } from './AdminSettings';
import { AdminHomepage } from './AdminHomepage';
import { AdminMembers } from './AdminMembers';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'dashboard' && <AdminDashboard onNavigateTab={setActiveTab} />}
      {activeTab === 'homepage' && <AdminHomepage />}
      {activeTab === 'members' && <AdminMembers />}
      {activeTab === 'news' && <AdminNews />}
      {activeTab === 'leadership' && <AdminLeadership />}
      {activeTab === 'events' && <AdminEvents />}
      {activeTab === 'media' && <AdminMedia />}
      {activeTab === 'documents' && <AdminDocuments />}
      {activeTab === 'programs' && <AdminPrograms />}
      {activeTab === 'faq' && <AdminFAQ />}
      {activeTab === 'messages' && <AdminMessages />}
      {activeTab === 'settings' && <AdminSettings />}
    </AdminLayout>
  );
};
