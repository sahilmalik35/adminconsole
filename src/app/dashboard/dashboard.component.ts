import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  breadcrumbs: Array<{ label: string, url: string }> = [];
  searchTerm1 = '';
  searchTerm2 = '';

  @ViewChild('dropdownMenuButton') dropdownMenuButton!: ElementRef;

  options1 = ['Option 1A', 'Option 1B', 'Option 1C'];
  options2 = ['Option 2A', 'Option 2B', 'Option 2C'];


  isCollapsed = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
    });
   }

  ngOnInit(): void {

  }

  createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<{ label: string, url: string }> = []): Array<{ label: string, url: string }> {
    // If there's no route, return the breadcrumbs
    if (!route) {
      return breadcrumbs;
    }

    // Get the children routes
    const children = route.children;

    // Return if there's no child
    if (children.length === 0) {
      return breadcrumbs;
    }

    // Loop through the children
    for (const child of children) {
      // If it's the primary route, build the breadcrumb
      if (child.outlet === 'primary') {
        const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
        if (routeURL !== '') {
          url += `/${routeURL}`;
        }

        let label = child.snapshot.data['breadcrumb'] || routeURL;
        if (label === 'home') {
          label = 'Home';
        }

        breadcrumbs.push({ label: label, url: url });

        return this.createBreadcrumbs(child, url, breadcrumbs);
      }
    }
    return breadcrumbs;
  }

  // Filtered options for searchable dropdowns
  filteredOptions1() {
    return this.options1.filter(option => option.toLowerCase().includes(this.searchTerm1.toLowerCase()));
  }

  filteredOptions2() {
    return this.options2.filter(option => option.toLowerCase().includes(this.searchTerm2.toLowerCase()));
  }

  // Toggle the side navigation collapsed state
  toggleSideNav() {
    this.isCollapsed = !this.isCollapsed;
  }

  openDropdown() {
    const dropdown = new bootstrap.Dropdown(this.dropdownMenuButton.nativeElement);
    dropdown.show();
  }
}




